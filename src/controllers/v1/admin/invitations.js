import Invitation from "../../../models/v1/invitation.js";
import moment from "moment";
import OTPGenerator from "otp-generator";
import {INVITATION_EMAIL} from "../../../utils/email/invitation.js";
import Admin from "../../../models/v1/admin.js";
import bcrypt from "bcryptjs";

export const inviteAdmin = async (req, res) => {
    try {
        const {create} = req.admin.permissions.invitation;
        if (!create) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const {email} = req.body;
        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin)return res.status(409).json({message: 'Email already taken'});
        const existingInvitation = await Invitation.findOne(
            {
                email, status: {$in: ['pending', 'accepted']}
            });
        if (existingInvitation) return res.status(409).json({message: 'Email already sent an invitation'});
        const expiryDate = moment().add(30, 'days');
        const invitationCode = OTPGenerator.generate(6, {
            digits: true,
            specialChars: false,
            upperCaseAlphabets: true,
            lowerCaseAlphabets: true
        });
        const invitation = await Invitation.create({inviter: req.admin._id, email, expiryDate, code: invitationCode});
        const user = {email};
        const link = `${process.env.ADMIN_SIGNUP_URL}/invitation?email=${email}&code=${invitationCode}`;
        const message = {
            code: invitationCode,
            link,
            inviter_email: req.admin.email,
            inviter_name: `${req.admin.firstName} ${req.admin.lastName}`
        };
        await INVITATION_EMAIL.sendInvitationEmail(user, message);
        res.status(201).json({data: invitation, message: ' Invited Sent Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateInvitation = async (req, res) => {
    try {
        const {update} = req.admin.permissions.invitation;
        if (!update) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id)
            .populate('invitee', 'firstName lastName email image')
            .populate('inviter', 'firstName lastName email image');
        if(!invitation) return res.status(404).json({message: 'Invitation not found'});
        if(invitation.status === 'accepted') return res.status(400).json({message: 'Invitation has already been accepted'});
        const allowedUpdates = ['expiryDate'];
        const updates = Object.keys(req.body);
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates){
            if(key === 'expiryDate'){
                if(moment().isSameOrAfter(req.body['expiryDate'])){
                    invitation.status = 'expired';
                }else if(moment().isBefore(req.body['expiryDate'])){
                    invitation.status = 'pending';
                }
            }
        }
        await invitation.save();
        res.status(200).json({data: invitation, message: 'Invitation Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteInvitation = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.invitation;
        if (!remove) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id);
        if(!invitation) return res.status(404).json({message: 'Invitation not found'});
        await invitation.remove();
        res.status(200).json({data: invitation, message: 'Invitation Deleted Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getInvitation = async (req, res) => {
    try {
        const {read} = req.admin.permissions.invitation;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const invitation = await Invitation.findById(req.params.id)
            .populate('invitee', 'firstName lastName email image')
            .populate('inviter', 'firstName lastName email image');
        if(!invitation) return res.status(404).json({message: 'Invitation not found'});
        res.status(200).json({data: invitation, message: 'Invitation Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getInvitations = async (req, res) => {
    try {
        const match = {};
        const {read} = req.admin.permissions.invitation;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;

        if (req.query.status) {
            match['status'] = req.query.status;
        }
        if (req.query.inviter) {
            match['inviter'] = req.query.inviter;
        }
        const invitationsCount = await Invitation.find(match).countDocuments();

        const invitations = await Invitation.find(match)
            .sort({createdAt: -1})
            .skip(skip)
            .limit(limit)
            .populate('invitee', 'firstName lastName email image')
            .populate('inviter', 'firstName lastName email image');

        res.status(200).json({
            data: invitations,
            currentPage: page,
            totalCount: invitationsCount,
            message: 'Invitations Retrieved Successfully'
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const acceptInvitation = async (req, res) => {
    try {
        const {code, firstName, lastName, phoneNumber, password, email, gender, birthdate, nationality} = req.body;

        const existingAdmin = await Admin.findOne({email});
        if(existingAdmin)return res.status(409).json({message: 'Email already taken'});
        const existingInvitation = await Invitation.findOne({email, _id: req.params.id, code});
        if (!existingInvitation) return res.status(404).json({message: 'Invitation not found'});
        if (existingInvitation.status === 'revoked')
            return res.status(401).json({message: 'Invitation has been revoked'});
        if (moment().isSameOrAfter(existingInvitation.expiryDate)) {
            existingInvitation.status = 'expired';
            return res.status(400).json({message: 'Invitation has expired. Contact admin to send a new invitation'});
        }
        existingInvitation.status = 'accepted';
        await existingInvitation.save();
        await Admin.create({
            email,
            gender,
            birthdate,
            nationality,
            firstName,
            lastName,
            phoneNumber,
            password: await bcrypt.hash(password, 10)
        });
        res.status(200).json({message: 'Invitation Accepted Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const rejectInvitation = async (req, res) => {
    try {
        const {code, email} = req.body;
        const existingInvitation = await Invitation.findOne({email, _id: req.params.id, code});
        if (!existingInvitation) return res.status(404).json({message: 'Invitation not found'});
        if (existingInvitation.status === 'revoked')
            return res.status(401).json({message: 'Invitation has been revoked'});
        if (moment().isSameOrAfter(existingInvitation.expiryDate)) {
            existingInvitation.status = 'expired';
            return res.status(400).json({message: 'Invitation has expired. Contact admin to send a new invitation'});
        }
        existingInvitation.status = 'rejected';
        await existingInvitation.save();
        res.status(200).json({message: 'Invitation Rejected Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const revokeInvitation = async (req, res) => {
    try {
        const {code, email} = req.body;
        const {revoke} = req.admin.permissions.invitation;
        if (!revoke) return res.status(401).json({message: 'You are not permitted to perform this operation'});
        const invitation = await Invitation.findOne({_id: req.params.id, code, email});
        if (!invitation) return res.status(404).json({message: 'Invitation not found'});
        invitation.status = 'revoked';
        await invitation.save();
        res.status(200).json({message: 'Invitation Revoked Successfully', data: invitation});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
