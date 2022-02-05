import {Schema, model} from "mongoose";

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Department = model('Department', departmentSchema);

export default Department;
