import Department from "../../../models/v1/department.js";
import Course from "../../../models/v1/course.js";

export const createCourse = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {create} = permissions.course;
        if (!create) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const {name, department} = req.body;
        if (!name || !department) return res.status(400).json({message: 'Missing required fields'});
        const existingDepartment = await Department.findById(department, {name: 1});
        if (!existingDepartment) return res.status(404).json({message: 'Department does not exist'});
        const existingCourse = await Course.findOne({name: name.toString()});
        if (existingCourse) return res.status(409).json({message: 'Course already exists'});
        const createdCourse = await Course.create({name, department});
        await createdCourse.populate('department', 'name');
        res.status(201).json({data: createdCourse, message: `${name} Created Successfully`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateCourse = async (req, res) => {
    try {
        const updates = Object.keys(req.body);
        const allowedUpdates = ['name', 'status', 'department'];
        const {update} = req.admin.course;
        if (!update) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: 'Course not found'});
        for (let key of updates) {
            if (key === 'name') {
                if (req.body['name'].toLowerCase() === course.name.toLowerCase()) {
                    return res.status(409).json({message: 'Course already exist'});
                }
            } else if (key === 'department') {
                const course = await Course.findById(req.body['department']);
                if (!course) return res.status(404).json({message: 'Course not found'});
            }
            course[key] = req.body[key];
        }
        await course.save();
        res.status(200).json({data: course, message: 'Course Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const deleteCourse = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {delete: remove} = permissions.department;
        if (!remove) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: 'Course not found'});
        await course.remove();
        res.status(201).json({data: course, message: 'Course Removed Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCourse = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {read} = permissions.department;
        if (!read) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const course = await Course.findById(req.params.id);
        if (!course) return res.status(404).json({message: 'Course not found'});
        await course.populate('department', 'name');
        res.status(200).json({data: {}, message: 'Course Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getCourses = async (req, res) => {
    try {
        const match = {};
        const {permissions} = req.admin;
        const {read} = permissions.department;
        if (!read) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        if (req.query.department) {
            match['department'] = req.query.department;
        }
        if (req.query.status) {
            match['status'] = req.query.status;
        }
        const courses = await Course.find(match, {name: 1}).populate({path: 'department', select: 'name'});
        res.status(200).json({data: courses, message: `${courses.length} Courses Retrieved Successfully`});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
