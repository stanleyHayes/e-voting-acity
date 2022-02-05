import {Router} from "express";
import {getCandidates, getCandidate} from "../../../controllers/v1/user/candidates.js";

const router = Router({mergeParams: true});

router.route('/').get(getCandidates);
router.route('/:id').get(getCandidate);

export default router;
