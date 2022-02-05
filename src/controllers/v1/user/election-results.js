export const getElectionResult = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Election Result Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElectionResults = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Election Results Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
