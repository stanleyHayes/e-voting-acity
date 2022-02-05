export const getDepartment = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Admin Department Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getDepartments = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Departments Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
