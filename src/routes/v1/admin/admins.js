import {Router} from "express";
import {createAdmin, getAdmin, getAdmins, updateAdmin, deleteAdmin} from "../../../controllers/v1/admin/admins.js";

const router = Router({mergeParams: true});

router.route('/').get(getAdmins).post(createAdmin);
router.route('/:id').get(getAdmin).put(updateAdmin).delete(deleteAdmin);

export default router;
