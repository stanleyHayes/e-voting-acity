import {Router} from "express";
import {
    getElections,
    getElection,
    getOnGoingElections,
    getUpcomingElections,
} from "../../../controllers/v1/user/elections.js";

const router = Router({mergeParams: true});
router.get('/upcoming', getUpcomingElections);
router.get('/ongoing', getOnGoingElections);
router.route('/').get(getElections);
router.route('/:id').get(getElection);

export default router;
