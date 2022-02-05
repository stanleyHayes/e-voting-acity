import {Router} from "express";
import {
    getCourses,
    createCourse,
    deleteCourse,
    getCourse,
    updateCourse
} from "../../../controllers/v1/admin/courses.js";

const router = Router({mergeParams: true});

router.route('/').get(getCourses).post(createCourse);
router.route('/:id').get(getCourse).put(updateCourse).delete(deleteCourse);

export default router;
