import mongoose from "mongoose";
import validator from "validator";

const Schema = mongoose.Schema;
const model = mongoose.model;

const invitationSchema = new Schema({
    email: {
        type: String,
        required: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error(`Invalid email ${value}`);
            }
        }
    },
    expiryDate: {
        type: Date,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'accepted', 'expired', 'revoked'],
        default: 'pending'
    },
    invitee: {
        type: Schema.Types.ObjectId,
        ref: 'Admin'
    },
    inviter: {
        type: Schema.Types.ObjectId,
        ref: 'Admin',
        required: true
    },
    code: {
        type: String,
        required: true
    }
}, {timestamps: {createdAt: true, updatedAt: true}});

const Invitation = model('Invitation', invitationSchema);

export default Invitation;
