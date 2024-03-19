import mongoose from "mongoose";

const schema = new mongoose.Schema({

    from: { type: String, required: true },
    to: { type: String, required: true },
    time:{ type: String },
    flightNumber: { type: String, required: true },

}, { timestamps: true });

export const SearchTicket=mongoose.model("SearchTicket",schema);
