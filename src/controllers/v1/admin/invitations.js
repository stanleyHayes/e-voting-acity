export const inviteAdmin = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Admin Invited Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateInvitation = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Invitation Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteInvitation = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Invitation Deleted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getInvitation = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Invitation Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getInvitations = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Invitations Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
