import mongoose from "mongoose";

const schema = new mongoose.Schema({
    
    name: {
        type: String,
        required:true,
    },

    phoneNumber: { type: Number },
    
    address:{type:String},
    email: {
        type: String,
        required:true,
        unique:true,
    },
    password: {
        type: String,
        required:true,
        select: false,
    },
    createdAt: {
        type: Date,
        default:Date.now,
    }
});

 export const User = mongoose.model("User", schema);

