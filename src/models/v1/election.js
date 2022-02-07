import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const electionSchema = new Schema({
    banner: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    startDate: {
        type: Date,
        required: true,
    },
    startTime: {
        type: Date,
        required: true,
    },
    startDateTime: {
        type: Date,
        required: true,
    },
    endDateTime: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    maximumAllowedCandidates: {
        type: Number,
        required: true,
        min: 0
    },
    minimumAllowedCandidates: {
        type: Number,
        required: true,
        min: 0
    },
    authorizations: {
        departments: {type: [{type: Schema.Types.ObjectId, ref: 'Department'}]},
        courses: {type: Schema.Types.ObjectId, ref: 'Course'},
        levels: {type: [String]}
    },
    scope: {
        type: String,
        enum: ['school', 'department', 'club', 'course'],
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});


electionSchema.virtual('candidateCount', {
    localField: '_id',
    count: true,
    foreignField: 'election'
});


const Election = model('Election', electionSchema);

export default Election;
