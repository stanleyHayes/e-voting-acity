import Admin from "../../../models/v1/admin.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const {firstName, lastName, email, phoneNumber, password, gender, birthdate, nationality} = req.body;
        if (!firstName && !lastName && !phoneNumber && !password && !nationality && !birthdate && !gender)
            return res.status(400).json({message: 'Missing required fields'});
        const existingUser = await Admin.findOne({email});
        if (existingUser) return res.status(409).json({message: `An account exist with ${email}`});
        const newAdmin = await Admin.create({
            email,
            firstName,
            lastName,
            phoneNumber,
            nationality,
            birthdate,
            gender,
            password: await bcrypt.hash(password, 10)
        });
        res.status(201).json({message: 'Account Successfully Created', data: newAdmin});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) return res.status(400).json({message: 'Missing required fields'});

        const existingUser = await Admin.findOne({email});
        if (!existingUser) return res.status(401).json({message: 'Auth Failed'});

        if (!await bcrypt.compare(password, existingUser.password))
            return res.status(401).json({message: 'Auth Failed'});
        const token = jwt.sign({_id: existingUser._id.toString()}, process.env.JWT_SECRET, {expiresIn: '30d'}, null);
        existingUser.devices = existingUser.devices.concat({token, ...req.useragent});
        await existingUser.save();

        res.status(200).json({message: 'Successfully Logged In', data: existingUser, token});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Update Profile', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Get Profile', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deactivateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Deactivate Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updatePassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Update Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Reset Password', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resendOTP = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Resend OTP', data: {}});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const verifyAccount = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Resend OTP', data: {}});
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
