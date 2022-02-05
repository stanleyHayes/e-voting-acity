import {Schema, model} from "mongoose";

const electionResultSchema = new Schema({

}, {timestamps: {createdAt: true, updatedAt: true}});

const ElectionResult = model('ElectionResult', electionResultSchema);

export default ElectionResult;
