import Vote from "../../../models/v1/vote.js";

export const getVote = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {get} = permissions.course;
        if (!get) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const vote = await Vote.findById(req.params.id)
            .populate({path: 'user', select: 'firstName image lastName fullName'})
            .populate({path: 'election', select: 'banner title description'})
            .populate({path: 'candidate', select: 'user', populate: {path: 'user', select: 'firstName image lastName'}})

        res.status(200).json({data: vote,  message: 'Vote Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getVotes = async (req, res) => {
    try {
        const match = {};
        const {permissions} = req.admin;
        const {get} = permissions.course;
        if (!get) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        if(req.query.user){
            match['user'] = req.query.user;
        }
        if(req.query.election){
            match['election'] = req.query.election;
        }
        if(req.query.candidate){
            match['candidate'] = req.query.candidate;
        }
        const votes = await Vote.find(match)
            .populate({path: 'user', select: 'firstName image lastName fullName'})
            .populate({path: 'election', select: 'banner title description'})
            .populate({path: 'candidate', select: 'user', populate: {path: 'user', select: 'firstName image lastName'}})

        res.status(200).json({data: votes,  message: 'Admin Votes Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
