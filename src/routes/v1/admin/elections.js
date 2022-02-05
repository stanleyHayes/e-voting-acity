import {Router} from "express";
import {
    getElections,
    createElection,
    deleteElection,
    getElection,
    getOnGoingElections,
    getUpcomingElections,
    updateElections
} from "../../../controllers/v1/admin/elections.js";

const router = Router({mergeParams: true});
router.get('/upcoming', getUpcomingElections);
router.get('/ongoing', getOnGoingElections);
router.route('/').get(getElections).post(createElection);
router.route('/:id').get(getElection).put(updateElections).delete(deleteElection);

export default router;
