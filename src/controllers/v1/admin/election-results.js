export const createElectionResult = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Admin Election Created Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateElectionResult = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Election Result Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteElectionResult = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Delete Election Result Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElectionResult = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Election Result Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getElectionResults = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Election Results Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
