import {Router} from "express";
import {getDepartments, createDepartment, deleteDepartment, getDepartment, updateDepartment} from "../../../controllers/v1/admin/departments.js";
import authenticate from "../../../middleware/v1/admin/authentication.js";

const router = Router({mergeParams: true});

router.route('/').get(authenticate, getDepartments).post(authenticate, createDepartment);
router.route('/:id').get(authenticate, getDepartment).put(authenticate, updateDepartment).delete(authenticate, deleteDepartment);

export default router;
