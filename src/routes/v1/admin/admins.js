import {Router} from "express";
import {createAdmin, getAdmin, getAdmins, updateAdmin, deleteAdmin} from "../../../controllers/v1/admin/admins.js";
import authenticate from "../../../middleware/v1/admin/authentication.js";

const router = Router({mergeParams: true});

router.route('/').get(authenticate, getAdmins).post(authenticate, createAdmin);
router.route('/:id').get(authenticate, getAdmin).put(authenticate, updateAdmin).delete(authenticate, deleteAdmin);

export default router;
