import mongoose from "mongoose";

const Schema = mongoose.Schema;
const model = mongoose.model;

const electionRegistrationSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    election: {
        type: Schema.Types.ObjectId,
        ref: 'Election',
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const ElectionRegistration = model('ElectionRegistration', electionRegistrationSchema);

export default ElectionRegistration;
