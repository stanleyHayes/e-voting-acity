import Election from "../../../models/v1/election.js";
import Candidate from "../../../models/v1/candidate.js";
import ElectionRegistration from "../../../models/v1/election-registration.js";
import moment from "moment";

export const createElection = async (req, res) => {
    try {
        const {
            banner,
            title,
            description,
            startDate,
            startTime,
            endDate,
            endTime,
            maximumAllowedCandidates,
            minimumAllowedCandidates,
            authorizations,
            scope
        } = req.body;

        const startDateTime = moment(`${startDate} ${startTime}`);
        const endDateTime = moment(`${endDate} ${endTime}`);
        const election =  await Election.create({
            banner,
            title,
            description,
            startDate,
            startTime,
            endDate,
            endTime,
            startDateTime,
            endDateTime,
            maximumAllowedCandidates,
            minimumAllowedCandidates,
            authorizations,
            scope
        });

        res.status(201).json({data: election, message: 'Election Created Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateElections = async (req, res) => {
    try {
        const {update} = req.admin.permissions.election;
        if (!update) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const election = await Election.find(req.params.id)
            .populate('candidateCount')
            .populate('candidates');
        if (!election) return res.status(404).json({message: 'Election not found'});
        if(election.status !== 'pending') return res.status(400).json({message: 'Election cannot be updated'});
        const updates = Object.keys(req.body);
        const allowedUpdates = [
            'scope',
            'banner',
            'title',
            'description',
            'startDate',
            'startTime',
            'endDate',
            'endTime',
            'maximumAllowedCandidates',
            'minimumAllowedCandidates',
            'authorizations',
            'status'
        ];
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if(!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for(let key of updates){
            if(key === 'startDate'){
                election.startDate = req.body['startDate'];
                election.startDateTime = moment(`${election.startDate} ${election.startTime}`)
                continue;
            }

            if(key === 'startTime'){
                election.startTime = req.body['startTime'];
                election.startDateTime = moment(`${election.startDate} ${election.startTime}`)
                continue;
            }

            if(key === 'endDate'){
                election.endDate = req.body['endDate'];
                election.endDateTime = moment(`${election.endDate} ${election.endTime}`)
                continue;
            }

            if(key === 'endTime'){
                election.endTime = req.body['endTime'];
                election.endDateTime = moment(`${election.startDate} ${election.endTime}`)
                continue;
            }
            election[key] = req.body[key];
        }
        await election.save();
        res.status(200).json({data: election, message: 'Elections Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElections = async (req, res) => {
    try {
        const {read} = req.admin.permissions.election;
        if (!read) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 50;
        const skip = (page - 1) * limit;
        const match = {};
        if (req.query.scope) {
            match['scope'] = req.query.scope;
        }
        if (req.query.status) {
            match['status'] = req.query.status;
        }

        if(req.query.startDate){
            match['startDate'] = {$gte: {startDate: req.query.startDate}};
        }

        if(req.query.endDate){
            match['endDate'] = {$gte: {endDate: req.query.endDate}};
        }

        const elections = await Election.find(match)
            .populate('candidates')
            .populate('candidateCount')
            .skip(skip).limit(limit).sort({startDateTime: -1});

        const totalElections = await Election.find(match).countDocuments();
        res.status(200).json({
            data: elections,
            electionCount: totalElections,
            message: 'Admin Elections Retrieved Successfully'
        });
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getOnGoingElections = async (req, res) => {
    try {
        const {read} = req.admin.permissions.election;
        if (!read) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const elections = await Election.find({status: 'published', startDateTime: {$gte: Date.now()}, endDateTime:{$lte: Date.now()}})
            .sort({startDateTime: -1})
            .populate('candidates')
            .populate('candidateCount');
        res.status(200).json({data: elections, message: 'Ongoing Elections Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUpcomingElections = async (req, res) => {
    try {
        const {read} = req.admin.permissions.election;
        if (!read) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const elections = await Election.find({status: 'published', startDateTime: {$lte: Date.now()}})
            .sort({startDateTime: -1})
            .populate('candidates')
            .populate('candidateCount');
        res.status(200).json({data: elections, message: 'Upcoming Elections Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElection = async (req, res) => {
    try {
        const {read} = req.admin.permissions.election;
        if (!read) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const election = await Election.find(req.params.id)
            .populate('candidateCount')
            .populate('candidates');
        if (!election) return res.status(404).json({message: 'Election not found'});
        res.status(200).json({data: election, message: 'Admin Election Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteElection = async (req, res) => {
    try {
        const {delete: remove} = req.admin.permissions.election;
        if (!remove) return res.status(401).json({message: 'You do not have permissions to perform this operation'});
        const election = await Election.find(req.params.id)
            .populate('candidateCount')
            .populate('candidates');
        if (!election) return res.status(404).json({message: 'Election not found'});
        if (election.status !== 'pending') {
            return res.status(400).json({message: 'Election cannot be removed'});
        }
        await election.remove();
        await Candidate.deleteMany({election: req.params.id});
        await ElectionRegistration.deleteMany({election: req.params.id});
        res.status(200).json({data: election, message: 'Admin Election Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
