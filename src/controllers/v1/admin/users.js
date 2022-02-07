import User from "../../../models/v1/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import OTPGenerator from "otp-generator";
import {VERIFICATION_EMAIL} from "../../../utils/email/verification.js";
import {SMS_VERIFICATION} from "../../../utils/sms/verification.js";
import moment from "moment";

export const createUser = async (req, res) => {
    try {
        const {create} = req.admin.permissions.user;
        if (!create) return res.status(401).json({message: 'You do not have permission to complete this operation'});
        const {
            firstName,
            middleName,
            lastName,
            email,
            phoneNumber,
            rollNumberOrStaffID,
            password,
            nationality,
            birthdate,
            gender,
            level,
            department,
            course,
            role
        } = req.body;
        const existingUser = await User.findOne({$or: [{email}, {rollNumberOrStaffID}]});
        if (existingUser) return res.status(409).json({message: `${email} or ${rollNumberOrStaffID} already taken`});
        const newUser = await User.create({
            nationality,
            birthdate,
            gender,
            level,
            department,
            course,
            role,
            firstName,
            middleName,
            lastName,
            phoneNumber,
            password: await bcrypt.hash(password, 10)
        });

        const token = jwt.sign({_id: newUser._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30d'}, null);
        const otp = OTPGenerator.generate(6, {
            digits: true,
            lowerCaseAlphabets: false,
            upperCaseAlphabets: false,
            specialChars: false
        });
        const link = `https://e-votingacity.vercel.app/auth/verify?token=${token}&otp=${otp}`;
        const user = {first_name: firstName, last_name: lastName, email};
        const message = {otp, link};

        await VERIFICATION_EMAIL.sendVerificationEmail(user, message);
        await SMS_VERIFICATION.sendVerificationSMS(phoneNumber, message);
        newUser.authInfo = {token, otp, expiresAt: moment().add(30, 'days')};
        await newUser.save();
        res.status(201).json({data: newUser, message: 'User Created Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateUser = async (req, res) => {
    try {
        const {update} = req.admin.permissions.user;
        if (!update) return res.status(401).json({message: 'You do not have permission to complete this operation'});
        const user = await User.findById(req.params.id)
            .populate({path: 'course', select: 'name'})
            .populate({path: 'department', select: 'name'});
        if(!user) return res.status(404).json({message: 'User not found'});
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'firstName',
            'lastName',
            'phoneNumber',
            'image',
            'permissions',
            'nationality',
            'status',
            'gender',
            'level',
            'role',
            'bio',
            'socialMediaAccounts',
            'interests',
            'birthdate',
            'rollNumberOrStaffID',
            'image',
            'middleName'
        ];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates){
            if(key === 'phoneNumber'){
                if(user.phoneNumber !== req.body['phoneNumber']){
                    const existingUser = await User.findOne({phoneNumber: req.body['phoneNumber']});
                    if(existingUser) return res.status(409).json({message: 'Phone number already taken'});
                }else{
                    user.phoneNumber = req.body['phoneNumber'];
                }
            }
            if(key === 'rollNumberOrStaffID'){
                if(user.rollNumberOrStaffID !== req.body['rollNumberOrStaffID']){
                    const existingUser = await User.findOne({rollNumberOrStaffID: req.body['rollNumberOrStaffID']});
                    if(existingUser) return res.status(409).json({message: 'Roll Number or Staff ID already taken'});
                }else{
                    user.rollNumberOrStaffID = req.body['rollNumberOrStaffID'];
                }
            }
            user[key] = req.body[key];
        }
        await user.save();
        res.status(200).json({data: user, message: 'User Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteUser = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.user;
        if (!remove) return res.status(401).json({message: 'You do not have permission to complete this operation'});
        const user = await User.findById(req.params.id)
            .populate({path: 'course', select: 'name'})
            .populate({path: 'department', select: 'name'});
        if(!user) return res.status(404).json({message: 'User not found'});
        user.status = 'suspended';
        await user.save();
        res.status(200).json({data: user, message: 'User Suspended Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUser = async (req, res) => {
    try {
        const {read} = req.admin.permissions.user;
        if (!read) return res.status(401).json({message: 'You do not have permission to complete this operation'});
        const user = await User.findById(req.params.id)
            .populate({path: 'course', select: 'name'})
            .populate({path: 'department', select: 'name'});
        if(!user) return res.status(404).json({message: 'User not found'});
        res.status(200).json({data: user, message: 'User Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUsers = async (req, res) => {
    try {
        const {read} = req.admin.permissions.user;
        if (!read) return res.status(401).json({message: 'You do not have permission to complete this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.role) {
            match['role'] = req.query.role;
        }
        if (req.query.status) {
            match['status'] = req.query.status;
        }
        if (req.query.course) {
            match['course'] = req.query.course;
        }
        if (req.query.department) {
            match['department'] = req.query.department;
        }

        const users = await User.find(match)
            .limit(limit)
            .skip(skip)
            .sort({createdAt: -1})
            .populate({path: 'course', select: 'name'})
            .populate({path: 'department', select: 'name'});

        const totalUsers = await User.find(match).countDocuments();
        res.status(200).json({
            data: users,
            currentPage: page,
            usersCount: totalUsers,
            message: 'Users Retrieved Successfully'
        });

    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
