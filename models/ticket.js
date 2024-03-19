import mongoose from "mongoose";

const schema = new mongoose.Schema({
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  date: { type: String },
  totalPassenger: { type: Number },
  adult: { type: Number },
  child: { type: Number },
  tripType: { type: String, required: true },
  amount: { type: Number },
    //price per person or total price for the group
    returnDate: { type: String },
  passengerDetails: [
   
  ],

 
  flightNumber: { type: String },
  createdAt: { type: Date, default: Date.now() },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

export const Ticket = mongoose.model("Ticket", schema);
