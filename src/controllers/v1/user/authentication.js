export const login = async (req, res) => {
    try {
        res.status(200).json({message: 'Login Successful', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Update Profile', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Get Profile', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deactivateProfile = async (req, res) => {
    try {
        res.status(200).json({message: 'Deactivate Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updatePassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Update Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resetPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Reset Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const resendOTP = async (req, res) => {
    try {
        res.status(200).json({message: 'Resend OTP', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const verifyAccount = async (req, res) => {
    try {
        res.status(200).json({message: 'Resend OTP', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}

export const forgotPassword = async (req, res) => {
    try {
        res.status(200).json({message: 'Admin Forgot Password', data: {}});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
