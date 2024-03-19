import { Admin } from "../models/admin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "../models/user.js";
import { SearchTicket } from "../models/search.js";
import { Ticket } from "../models/ticket.js";

export const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email: email }).select("+password");

    if (!admin) {
      return res.json({
        success: false,
        message: "Admin doesn't exist",
      });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch)
      return res.json({
        success: false,
        message: "Invalid Email or Password",
      });

    const admintoken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

    res
      .cookie("admintoken", admintoken, {
        httpOnly: true,
        maxAge: 30 * 60 * 1000,
      })
      .json({
        admintoken,
        success: true,
        message: "Admin Logged In Successfully",
      });
  } catch (error) {
    console.log(error);
  }
};

export const count = async (req, res) => {
  const bookedticket = await Ticket.countDocuments();
  const usercount = await User.countDocuments();
  const admincount = await Admin.countDocuments();

  res.json({
    success: true,
    usercount,
    admincount,
    bookedticket,
  });
};

export const adminRegister = async (req, res) => {
  const { email, password } = req.body;

  let admin = await Admin.findOne({ email: email });
  if (admin) {
    return res.status(404).json({
      success: false,
      message: "Admin already exists",
    });
  }
  const hashedPassword = await bcrypt.hash(password, 10);

  admin = await Admin.create({
    email,
    password: hashedPassword,
  });

  const admintoken = jwt.sign({ _id: admin._id }, process.env.JWT_SECRET);

  res
    .cookie("admintoken", admintoken, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      success: true,
      admin,
    });
};

export const adminLogout = (req, res) => {
  res.clearCookie("admintoken");
  res.json({
    success: true,
    message: "Admin Logged out successfully",
  });
};

export const adminProfile = (req, res) => {
  res.json({
    success: true,
    admin: req.admin,
  });
};

export const allCreatedTicket = async (req, res) => {
  try {
    const ticket = await Ticket.find().populate('user', 'name');;

    if (!ticket)
      return res.json({
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
