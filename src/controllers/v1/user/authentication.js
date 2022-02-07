import {VERIFICATION_EMAIL} from "./../../../utils/email/verification.js";
import User from "../../../models/v1/user.js";
import Department from "../../../models/v1/department.js";
import Course from "../../../models/v1/course.js";
import OTPGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import {SMS_VERIFICATION} from "../../../utils/sms/verification.js";
import moment from "moment";
import bcrypt from "bcryptjs";


export const register = async (req, res) => {
    try {
        const {
            email,
            firstName,
            middleName,
            lastName,
            rollNumberOrStaffID,
            phoneNumber,
            image,
            password,
            nationality,
            birthdate,
            gender,
            level,
            department,
            course
        } = req.body;
        if (!firstName && !lastName && !rollNumberOrStaffID && !phoneNumber && !image && !password && !nationality && !birthdate && !gender && !level && !department && !course)
            return res.status(400).json({message: 'Missing required fields'});
        if (!email.endsWith('@acity.edu.gh'))
            return res.status(403).json({message: 'You do not belong to this organization'});

        const existingUser = await User.findOne({$or: [{rollNumberOrStaffID}, email]});
        if (existingUser)
            return res.status(409).json({message: `An account exist with ${email} or ${rollNumberOrStaffID}`});

        const existingDepartment = await Department.findById(department);
        const existingCourse = await Course.findOne({department, course});
        if (!existingDepartment) return res.status(404).json({message: 'Department does not exist'});
        if (!existingCourse) return res.status(404).json({message: 'Course does not exist'});

        const newUser = await User.create({
            email,
            firstName,
            middleName,
            lastName,
            rollNumberOrStaffID,
            phoneNumber,
            image,
            level,
            department,
            course,
            password: await bcrypt.hash(password, 10)
        });
        await newUser.populate('department').populate('course');
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
        res.status(201).json({message: `Verification Sent to ${email} and ${phoneNumber}`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const login = async (req, res) => {
    try {
        res.status(200).json({message: 'Login Successful', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Update Profile', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Get Profile', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deactivateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Deactivate Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updatePassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Update Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Reset Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}



export const resendOTP = async (req, res) => {
    try {
        res.status(200).json({message: 'Resend OTP', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}



export const verifyAccount = async (req, res) => {
    try {
        res.status(200).json({message: 'Resend OTP', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}



export const forgotPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Forgot Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
