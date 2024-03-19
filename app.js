import express from "express";
import userRouter from "./Routes/user.js";
import { User } from "./models/user.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { Ticket } from "./models/ticket.js";
import ticketRouter from "./Routes/ticket.js";
import searchRouter from "./Routes/search.js";
import { SearchTicket } from "./models/search.js";
import adminRouter from "./Routes/admin.js";
import { Admin } from "./models/admin.js";






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
app.use("/api/v1/ticket", ticketRouter);
app.use("/api/v1/ticket", searchRouter);
app.use("/api/v1/admin", adminRouter);
app.use(User);
app.use(Ticket);
app.use(SearchTicket);
app.use(Admin);



app.listen(4000, () => {
  console.log("server is working ");
});
