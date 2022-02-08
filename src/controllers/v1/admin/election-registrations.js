import ElectionRegistration from "../../../models/v1/election-registration.js";
import moment from "moment";

export const getElectionRegistrations = async (req, res) => {
    try {
        const {read} = req.admin.permissions.electionRegistration;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.user) {
            match['user'] = req.query.user;
        }
        if (req.query.election) {
            match['election'] = req.query.election;
        }
        const electionResults = await ElectionRegistration.find(match)
            .skip(skip)
            .limit(limit)
            .populate({path: 'election', select: 'candidates candidateCount title description banner'})
            .populate({path: 'user', select: 'firstName lastName image'});

        const totalElectionResults = await ElectionRegistration.find(match).countDocuments();

        res.status(200).json({
            data: electionResults,
            electionCount: totalElectionResults,
            message: 'Registered For Election Successfully'
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElectionRegistration = async (req, res) => {
    try {
        const {read} = req.admin.permissions.electionRegistration;
        if (!read) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const electionRegistration = await ElectionRegistration.findById(req.params.id)
            .populate({path: 'election', select: 'candidates candidateCount title description banner'})
            .populate({path: 'user', select: 'firstName lastName image'});
        if (!electionRegistration) return res.status(404).json({message: 'Election Registration not found'});
        res.status(200).json({
            data: electionRegistration,
            message: 'Registered For Election Successfully'
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteElectionRegistration = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.electionRegistration;
        if (!remove) return res.status(401).json({message: 'You do not have permission to perform this operation'});
        const electionRegistration = await ElectionRegistration.findById(req.params.id)
            .populate({path: 'election', select: 'candidates candidateCount title description banner'})
            .populate({path: 'user', select: 'firstName lastName image'});
        if (!electionRegistration) return res.status(404).json({message: 'Election Registration not found'});
        if(moment().isSameOrAfter(electionRegistration.election.startDateTime))
            return res.status(400).json({message: 'Operation not permitted'});
        await electionRegistration.remove();
        res.status(200).json({message: 'Registered For Election Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
