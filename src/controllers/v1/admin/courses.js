export const createCourse = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Create Course Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateCourse = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Course Updated Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteCourse = async (req, res) => {
    try {
        res.status(201).json({data: {},  message: 'Course Revoked Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCourse = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Course Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCourses = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Courses Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
