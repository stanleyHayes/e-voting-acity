export const deleteDepartment = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Department Deleted Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateDepartment = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Department Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getDepartment = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Department Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getDepartments = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Departments Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const createDepartment = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Admin Department Created Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
