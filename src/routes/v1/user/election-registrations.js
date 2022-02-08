import express from "express";
import authenticate from "../../../middleware/v1/user/authentication.js";
import {
    deleteElectionRegistration,
    getElectionRegistration,
    getElectionRegistrations,
    registerForElection
} from "../../../controllers/v1/user/election-registrations.js";

const router = express.Router({mergeParams: true});

router.route('/')
    .post(authenticate, registerForElection)
    .get(authenticate, getElectionRegistrations);

router.route('/:id')
    .get(authenticate, getElectionRegistration)
    .delete(deleteElectionRegistration);


export default router;
