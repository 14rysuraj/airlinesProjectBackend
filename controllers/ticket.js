import { Ticket } from "../models/ticket.js";

export const newTicket = async (req, res, next) => {
    try {
  const { fromCity, toCity, date, totalPassenger,adult,child, tripType, amount, returnDate,passengerDetails ,flightNumber} =
    req.body;
   
   const ticket=await Ticket.create({
    fromCity,
    toCity,
    date,
    totalPassenger,
    adult,
    child,
    tripType,
    amount,
    returnDate,
    passengerDetails,
     user: req.user._id,
    flightNumber,
  });
    
  res.json({
    success: true,
    message: "Ticket booked successfully",
    ticket,

  });
} catch (error) {
    next(error);
  }
}


export const getMyTicket = async (req, res, next) => {
    try {
        const userid = req.user._id;
    
      const ticket = await Ticket.find({ user: userid });
      

      if (!ticket) return res.json({
        success: false,
        message: "Ticket not found",
      });

        res.status(200).json({
          success: true,
          ticket,
        });
      } catch (error) {
        next(error);
    }
  
  
};

    
export const deleteTicket = async (req,res,next) => {
  
  try {
    const ticket = await Ticket.findById(req.params.id);

    await ticket.deleteOne();
    res.json({
      success: true,
      message: 'The ticket has been cancelled',
    })
  } catch (error) {
    next(error);
  }

}




