import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Department = model('Department', departmentSchema);

export default Department;
