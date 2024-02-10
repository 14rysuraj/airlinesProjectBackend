import mongoose from "mongoose";
import {config} from "dotenv"


export const connectDB = () => {
    mongoose.connect("mongodb+srv://suraj:suraj123@cluster0.jeggbkp.mongodb.net/", {
    dbName:"backendapi",
}).then(() => console.log("database connected"))
        .catch((e) => console.error(e));
    

    
}
