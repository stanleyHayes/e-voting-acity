export const createCandidate = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Candidate Created Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateCandidate = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Candidate Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteCandidate = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Candidate Deleted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCandidate = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Candidate Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCandidates = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Votes Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
