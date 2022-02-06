import Department from "../../../models/v1/department.js";

export const deleteDepartment = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {delete: remove} = permissions.department;
        if (!remove) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const department = await Department.findById(req.params.id, {name: 1});
        if (!department) return res.status(404).json({message: 'Department does not exist'});
        department.status = 'deleted';
        await department.save();
        res.status(200).json({data: department, message: 'Department Deleted Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const updateDepartment = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {update} = permissions.department;
        if (!update) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const {id} = req.params;
        const department = await Department.findById(id, {name: 1});
        if (!department) return res.status(404).json({message: 'Department not found'});
        const allowedUpdates = ['name', 'status'];
        const updates = Object.keys(req.body);
        const isAllowed = updates.every(update => allowedUpdates.includes(update));
        if (!isAllowed) return res.status(400).json({message: 'Updates not allowed'});
        for (let key of updates) {
            if (key === 'name') {
                if (department.name.toLowerCase() === req.body['name']) {
                    return res.status(409).json({message: 'Department already exists'});
                } else {
                    department.name = req.body['name'];
                }
            }
        }
        await department.save();
        res.status(200).json({data: department, message: 'Department Updated Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getDepartment = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {read} = permissions.department;
        if (!read) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const {id} = req.params;
        const department = await Department.findById(id, {name: 1});
        if (!department) return res.status(404).json({message: 'Department not found'});
        res.status(200).json({data: department, message: 'Admin Department Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const getDepartments = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {read} = permissions.department;
        if (!read) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const departments = await Department.find({}, {name: 1});
        res.status(200).json({data: departments, message: 'Departments Retrieved Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}


export const createDepartment = async (req, res) => {
    try {
        const {permissions} = req.admin;
        const {create} = permissions.department;
        if (!create) return res.status(401).json({
            message: 'You do not have the permission to perform this operation'
        });
        const {name} = req.body;
        const existingDepartment = await Department.findOne({name: name.toLowerCase()}, {name: 1});
        if (existingDepartment) return res.status(409).json({message: 'Department already exists'});
        const department = await Department.create({name});
        res.status(201).json({data: department, message: 'Department Created Successfully'});
    } catch (e) {
        res.status(500).json({message: e.message});
    }
}
