import express from "express";
import userRouter from "./Routes/user.js";
import { User } from "./models/user.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";

const app = express();


config({
  path: "./data/config.env",
});

connectDB();

//using middleware

app.use(express.json());
app.use(cookieParser());

//routes
app.use("/api/v1", userRouter);
app.use(User);

app.listen(process.env.PORT, () => {
  console.log("server is working ");
});
