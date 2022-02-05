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
    forgotPassword
} from "../../../controllers/v1/user/authentication.js";

const router = Router({mergeParams: true});

router.post('/login', login);
router.get('/profile', getProfile);
router.put('/profile', updateProfile);
router.delete('/profile', deactivateProfile);
router.put('/profile/verify', verifyAccount);
router.post('/passwords/reset', resetPassword);
router.post('/passwords/update', updatePassword);
router.post('/passwords/forgot ', forgotPassword);
router.post('/otp/resend ', resendOTP);

export default router;
