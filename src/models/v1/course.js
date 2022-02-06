import mongoose from "mongoose";
const Schema = mongoose.Schema;
const model = mongoose.model;

const courseSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    },
    status: {
        type: String,
        enum: ['deleted', 'active'],
        default: 'active'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Course = model('Course', courseSchema);

export default Course;
