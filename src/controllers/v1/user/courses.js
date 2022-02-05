export const getCourse = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Course Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCourses = async (req, res) => {
    try {
        res.status(200).json({data: {},  message: 'Votes Retrieved Successfully'});
    }catch (e) {
        res.status(500).json({message: e.message});
    }
}
