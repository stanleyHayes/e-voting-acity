import User from "../../../models/v1/user.js";
import Election from "../../../models/v1/election.js";
import Candidate from "../../../models/v1/candidate.js";
import moment from "moment";

export const createCandidate = async (req, res) => {
    try {
        const {create} = req.admin.permissions.candidate;
        if (!create) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const {user, election, goals, manifesto, vettingResult, positions, achievements, slogan} = req.body;
        const existingUser = await User.findById(user);
        if (!existingUser) return res.status(404).json({message: 'Candidate does not exist'});
        const existingElection = await Election.findById(election);
        if (!existingElection) return res.status(404).json({message: 'Election does not exist'});
        const existingCandidate = await Candidate.findOne({election, user});
        if (existingCandidate) return res.status(404).json({message: 'Candidate already exists'});
        const candidate = await Candidate.create({
            user,
            election,
            goals,
            manifesto,
            vettingResult,
            positions,
            achievements,
            slogan
        });
        await candidate.populate('user').populate('election', 'title description banner');
        res.status(201).json({data: candidate, message: 'Candidate Created Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateCandidate = async (req, res) => {
    try {
        const {update} = req.admin.permissions.candidate;
        if (!update) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const updates = Object.keys(req.body);
        const allowedUpdates = ['banner', 'title', 'description', 'startDate', 'startTime', 'startDateTime', 'endDate', 'endTime', 'endDateTime', 'maximumAllowedCandidates', 'minimumAllowedCandidates', 'scope', 'authorizations'];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        const candidate = await Candidate.findById(req.params.id).populate('election');
        if (moment(candidate.election.startDateTime).isAfter(moment()))
            return res.status(400).json({
                message: 'Election already started. Cannot delete candidate'
            });
        res.status(200).json({data: candidate, message: 'Candidate Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteCandidate = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.candidate;
        if (!remove) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const candidate = await Candidate.findById(req.params.id).populate('election');
        if (moment(candidate.election.startDateTime).isAfter(moment()))
            return res.status(400).json({
                message: 'Election already started. Cannot delete candidate'
            });
        await candidate.remove();
        res.status(200).json({data: candidate, message: 'Candidate Removed Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCandidate = async (req, res) => {
    try {
        const {get} = req.admin.permissions.candidate;
        if (!get) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const candidate = await Candidate.findById(req.params.id)
            .populate({
                path: 'user',
                select: 'firstName lastName image'
            })
            .populate({
                path: 'election',
                select: 'title description banner'
            });
        if (!candidate) return res.status(404).json({message: 'Candidate not found'});
        res.status(200).json({data: candidate, message: 'Candidate Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCandidates = async (req, res) => {
    try {
        const match = {};
        const {get} = req.admin.permissions.candidate;
        if (!get) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        if (req.query.user) {
            match['user'] = req.query.user;
        }
        if (req.query.election) {
            match['election'] = req.query.election;
        }
        const candidates = await Candidate.find(match)
            .populate({
                path: 'user',
                select: 'firstName lastName image'
            })
            .populate({
                path: 'election',
                select: 'title description banner'
            });
        res.status(200).json({data: candidates, message: 'Votes Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
