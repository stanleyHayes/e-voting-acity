import {Router} from "express";

import {
    getElectionResults,
    createElectionResult,
    deleteElectionResult,
    getElectionResult,
    updateElectionResult
} from "../../../controllers/v1/admin/election-results.js";

const router = Router({mergeParams: true});

router.route('/').get(getElectionResults).post(createElectionResult);
router.route('/:id').get(getElectionResult).put(updateElectionResult).delete(deleteElectionResult);

export default router;
