import mongoose from "mongoose";
const  {Schema, model} = mongoose;
const candidateSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    election: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Election'
    },
    manifesto: {
        type: String,
        required: true
    },
    goals: {
        type: [String],
        required: true
    },
    vettingResult: {
        value: {
            type: Number,
            min: 0,
            max: 100
        },
        isRecommended: {
            type: Boolean,
            default: false
        }
    },
    positions: {
        type: [String]
    },
    achievements: {
        type: [String]
    },
    slogan: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Candidate = model('Candidate', candidateSchema);

export default Candidate;
