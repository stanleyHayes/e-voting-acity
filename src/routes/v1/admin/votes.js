import {Router} from "express";
import {getVotes, getVote} from "../../../controllers/v1/admin/votes.js";

const router = Router({mergeParams: true});

router.route('/').get(getVotes);
router.route('/:id').get(getVote);

export default router;
