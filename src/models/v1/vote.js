import {Schema, model} from "mongoose";

const voteSchema = new Schema({
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
    candidate: {
        type: Schema.Types.ObjectId,
        required: true,
        ref: 'Candidate'
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Vote = model('Vote', voteSchema);

export default Vote;
