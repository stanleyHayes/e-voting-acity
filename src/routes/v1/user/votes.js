import {Router} from "express";
import {castVote, getVotes, getVote, revokeVote, updateVote} from "../../../controllers/v1/user/votes.js";

const router = Router({mergeParams: true});

router.route('/').get(getVotes).post(castVote);
router.route('/:id').get(getVote).put(updateVote).delete(revokeVote);

export default router;
