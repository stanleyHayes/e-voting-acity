import express from "express";
import authenticate from "../../../middleware/v1/admin/authentication.js";
import {
    deleteElectionRegistration,
    getElectionRegistration,
    getElectionRegistrations
} from "../../../controllers/v1/admin/election-registrations.js";

const router = express.Router({mergeParams: true});

router.route('/').get(authenticate, getElectionRegistrations);
router.route('/:id')
    .get(authenticate, getElectionRegistration)
    .delete(deleteElectionRegistration);


export default router;
