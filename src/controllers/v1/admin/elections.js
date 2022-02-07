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
            maximumAllwedCandidates,
            minimumAllowedCandidates,
            authorizations,
            scope
        } = req.body;

        res.status(201).json({data: {}, message: 'Admin Create Election Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateElections = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Elections Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElections = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Elections Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getOnGoingElections = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Ongoing Elections Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUpcomingElections = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Upcoming Elections Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElection = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Election Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteElection = async (req, res) => {
    try {
        res.status(200).json({data: {}, message: 'Admin Election Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
