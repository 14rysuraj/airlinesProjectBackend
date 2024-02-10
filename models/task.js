import mongoose from "mongoose";
import { User } from "./user";

const schema = new mongoose.schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required:true,
    },

    isCompleted: {
        type: Boolean,
        default:false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    },
    createdAt: {
        type: Date,
        default:Date.now()
    }



})