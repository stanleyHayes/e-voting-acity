import {Schema, model} from "mongoose";

const electionSchema = new Schema({
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
        required: true
    },
    minimumAllowedCandidates: {
        type: Number,
        required: true
    },
    authorizations: {
        departments: {type: [{type: Schema.Types.ObjectId, ref: 'Department'}]},
        levels: {type: [String]}
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Election = model('Election', electionSchema);

export default Election;
