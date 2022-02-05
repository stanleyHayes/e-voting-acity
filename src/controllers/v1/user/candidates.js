export const getCandidate = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'User Candidate Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCandidates = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'User Candidates Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
