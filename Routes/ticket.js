import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";
import { deleteTicket, getMyTicket, newTicket } from "../controllers/ticket.js";

const ticketRouter = express.Router();

ticketRouter.post("/new",isAuthenticated, newTicket);
ticketRouter.get("/myTicket", isAuthenticated, getMyTicket);
ticketRouter.delete("/deleteTicket/:id", isAuthenticated, deleteTicket);


export default ticketRouter;