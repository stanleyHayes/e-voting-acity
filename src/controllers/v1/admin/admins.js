export const deleteAdmin = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Deleted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateAdmin = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getAdmins = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getAdmin = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const createAdmin = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Admin Created Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
