export const login = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Login', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Update Profile', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Get Profile', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deactivateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Deactivate Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updatePassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Update Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Reset Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resendOTP = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Resend OTP', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const verifyOTP = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Resend OTP', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

