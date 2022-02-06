import {Router} from "express";
import {
    login,
    deactivateProfile,
    getProfile,
    resendOTP,
    resetPassword,
    updatePassword,
    updateProfile,
    verifyAccount,
    forgotPassword,
    register
} from "../../../controllers/v1/admin/authentication.js";

const router = Router({mergeParams: true});

router.post('/register', register);
router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deactivateProfile);
router.put('/profile/verify', verifyAccount);
router.put('/passwords/reset', resetPassword);
router.put('/passwords/update', updatePassword);
router.post('/passwords/forgot ', forgotPassword);
router.post('/otp/resend', resendOTP);

export default router;
