import {Router} from "express";
import {getInvitations, deleteInvitation, getInvitation, updateInvitation, inviteAdmin} from "../../../controllers/v1/admin/invitations.js";

const router = Router({mergeParams: true});

router.route('/').get(getInvitations).post(inviteAdmin);
router.route('/:id').get(getInvitation).put(updateInvitation).delete(deleteInvitation);

export default router;
