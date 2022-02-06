import {Router} from "express";
import {
    getCourses,
    createCourse,
    deleteCourse,
    getCourse,
    updateCourse
} from "../../../controllers/v1/admin/courses.js";
import authenticate from "../../../middleware/v1/admin/authentication.js";

const router = Router({mergeParams: true});

router.route('/').get(authenticate, getCourses).post(authenticate, createCourse);
router.route('/:id').get(authenticate, getCourse).put(authenticate, updateCourse).delete(authenticate, deleteCourse);

export default router;
