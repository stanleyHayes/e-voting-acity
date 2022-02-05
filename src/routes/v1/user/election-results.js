import {Router} from "express";

import {
    getElectionResults,
    getElectionResult,
} from "../../../controllers/v1/user/election-results.js";

const router = Router({mergeParams: true});

router.route('/').get(getElectionResults);
router.route('/:id').get(getElectionResult);

export default router;
