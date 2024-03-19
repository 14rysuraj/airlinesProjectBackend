import express from "express";
import {
  addTicket,
  getSearchTicket,
  deleteSearhTicket,
  updateSearchTicket,
  ticketDetail,
} from "../controllers/search.js";

const router = express.Router();
router.get("/search", getSearchTicket);
router.post("/addTicket", addTicket);
router.delete("/delete/:id", deleteSearhTicket);
router.post("/update/:id", updateSearchTicket);
router.get("/search/:id", ticketDetail);


export default router;
