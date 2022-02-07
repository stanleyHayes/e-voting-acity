export const getElectionRegistrations = async (req, res) => {
    try {
        res.status(200).json({message: 'Registered For Election Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}



export const getElectionRegistration = async (req, res) => {
    try {
        res.status(200).json({message: 'Registered For Election Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}



export const deleteElectionRegistration = async (req, res) => {
    try {
        res.status(200).json({message: 'Registered For Election Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
