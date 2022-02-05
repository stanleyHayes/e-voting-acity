import {Schema, model} from "mongoose";

const courseSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    department: {
        type: Schema.Types.ObjectId,
        ref: 'Department',
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Course = model('Course', courseSchema);

export default Course;
