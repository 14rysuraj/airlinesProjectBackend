import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, email, password } = req.body;

  let user = await User.findOne({ email });

  if (user) {
    return res.json({
      //return here
      success: false,
      message: "user already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      success: true,
      message: "registered successfully",
    });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.json({ success: false, message: "user doesn't exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.json({ success: false, message: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      success: true,
      message: `Welcome back ${user.name}`,
    });
};

export const getMyProfile = async (req, res) => {
  const { token } = req.cookies;

  if (!token)
    return res.json({
      success: false,
      message: "Login First",
    });

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  const user = await User.findById(decoded._id);

  if (!user)
    return res.json({
      success: false,
      message: "user not found",
    });

  res.json({
    success: true,
    user,
  });
};


export const logout= (req, res) =>{

  res.cookie("token", "", {
    expires: new Date(Date.now())
  }).json({
    sucess: true,
    message:"Log out successfully"
  })

  
}


export const displayUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id);

  res.json({
    success: true,
    user,
  });
};
