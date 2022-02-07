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
import authenticate from "../../../middleware/v1/admin/authentication.js";

const router = Router({mergeParams: true});
router.get('/election/upcoming', authenticate, getUpcomingElections);
router.get('/election/ongoing', authenticate, getOnGoingElections);

router.route('/')
    .get(authenticate, getElections)
    .post(authenticate, createElection);

router.route('/:id')
    .get(authenticate, getElection)
    .put(authenticate, updateElections)
    .delete(authenticate, deleteElection);

export default router;
