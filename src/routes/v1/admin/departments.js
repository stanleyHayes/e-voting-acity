import {Router} from "express";
import {getDepartments, createDepartment, deleteDepartment, getDepartment, updateDepartment} from "../../../controllers/v1/admin/departments.js";

const router = Router({mergeParams: true});

router.route('/').get(getDepartments).post(createDepartment);
router.route('/:id').get(getDepartment).put(updateDepartment).delete(deleteDepartment);

export default router;
