import {Router} from "express";
import {
    getElections,
    getElection,
    getOnGoingElections,
    getUpcomingElections,
} from "../../../controllers/v1/user/elections.js";

const router = Router({mergeParams: true});
router.get('/election/upcoming', getUpcomingElections);
router.get('/election/ongoing', getOnGoingElections);
router.route('/').get(getElections);
router.route('/:id').get(getElection);

export default router;
