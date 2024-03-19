import { SearchTicket } from "../models/search.js";
import { Ticket } from "../models/ticket.js";

export const addTicket = async (req, res, next) => {
  try {
    const { from, to, time, flightNumber } = req.body;
    const createdTicket = await SearchTicket.create({
      from,
      to,
      time,
      flightNumber,
    });

    res.json({
      success: true,
      createdTicket,
    });
  } catch (error) {
      console.error(error);
  }
};

export const getSearchTicket = async (req, res, next) => {
  try {
    const searchTicket = await SearchTicket.find();
    res.json({
      success: true,
      searchTicket,
    });
  } catch (error) {
    console.error(error);
  }
};

export const deleteSearhTicket = async (req, res, next) => {
    try {
        const Ticket = await SearchTicket.findById(req.params.id);
        

        if (!Ticket) {
            res.status(404).json({
                success: false,
                message: "Ticket not found",
            })
        }

       const deleteTicket=await Ticket.deleteOne();
      res.json({
        success: true,
          message: 'The ticket deleted successfully',
        deleteTicket,
      })
    } catch (error) {
      console.error(error)
    }
}


export const updateSearchTicket = async (req, res) => {
  try {
    const { from, to, time, flightNumber } = req.body;
       
    const Ticket = await SearchTicket.findById(req.params.id);

    if (!Ticket) {
      res.status(404).json({
        success: false,
        message: "Ticket not found",
      })
    }

    if (from) Ticket.from = from;
    if (to) Ticket.to = to;
    if (time) Ticket.time = time;
    if (flightNumber) Ticket.flightNumber = flightNumber;

    await Ticket.save();

    res.json({
      success: true,
      message: 'The ticket has been updated',
      Ticket,
    })



        
  } catch (error) {
    console.error(error)
  }


}


export const ticketDetail = async (req, res) => {
    

  const { id } = req.params;

  const ticket = await SearchTicket.findById(id);


  if (!ticket) {

    return res.status(404).json({
      success: false,
      message: "Ticket not found",
    });

  }

    res.json({
      success: true,
      ticket,
    });
 

 
}






