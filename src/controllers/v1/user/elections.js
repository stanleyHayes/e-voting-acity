export const getElections = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Elections Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getOnGoingElections = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Ongoing Elections Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUpcomingElections = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Upcoming Elections Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElection = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Election Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
