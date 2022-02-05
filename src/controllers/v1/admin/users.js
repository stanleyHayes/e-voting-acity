export const createUser = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'User Created Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateUser = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'User Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteUser = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'User Deleted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUser = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'User Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getUsers = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Users Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
