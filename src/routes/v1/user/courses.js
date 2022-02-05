import {Router} from "express";
import {
    getCourses,
    getCourse,
} from "../../../controllers/v1/user/courses.js";

const router = Router({mergeParams: true});

router.route('/').get(getCourses);
router.route('/:id').get(getCourse);

export default router;
