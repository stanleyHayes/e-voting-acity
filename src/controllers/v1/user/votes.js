export const castVote = async (req, res) => {
    try {

        res.status(201).json({data: {},  message: 'Vote Casted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateVote = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Vote Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const revokeVote = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Vote Revoked Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getVote = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Vote Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getVotes = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Votes Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
