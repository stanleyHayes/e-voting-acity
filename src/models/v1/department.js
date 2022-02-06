import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    status: {
        type: String,
        enum: ['deleted', 'active'],
        default: 'active'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Department = model('Department', departmentSchema);

export default Department;
