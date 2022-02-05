import {Router} from "express";
import {
    getDepartments,
    getDepartment,
} from "../../../controllers/v1/user/departments.js";

const router = Router({mergeParams: true});

router.route('/').get(getDepartments);
router.route('/:id').get(getDepartment);

export default router;
