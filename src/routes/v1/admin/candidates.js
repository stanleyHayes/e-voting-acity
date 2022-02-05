import {Router} from "express";
import {getCandidates, getCandidate, createCandidate, deleteCandidate, updateCandidate} from "../../../controllers/v1/admin/candidates.js";

const router = Router({mergeParams: true});

router.route('/').get(getCandidates).post(createCandidate);
router.route('/:id').get(getCandidate).put(updateCandidate).delete(deleteCandidate);

export default router;
