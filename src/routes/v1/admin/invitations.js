import {Router} from "express";
import {
    getInvitations,
    deleteInvitation,
    getInvitation,
    updateInvitation,
    inviteAdmin,
    acceptInvitation,
    rejectInvitation,
    revokeInvitation
} from "../../../controllers/v1/admin/invitations.js";
import authenticate from "../../../middleware/v1/admin/authentication.js";

const router = Router({mergeParams: true});
router.put('/:id/accept', acceptInvitation);
router.put('/:id/reject', rejectInvitation);
router.put('/:id/revoke', revokeInvitation);
router.route('/').get(authenticate, getInvitations).post(authenticate, inviteAdmin);
router.route('/:id').get(authenticate, getInvitation).put(authenticate, updateInvitation).delete(authenticate, deleteInvitation);

export default router;
