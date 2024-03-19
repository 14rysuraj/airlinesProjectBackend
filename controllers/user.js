import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, phoneNumber, address, email, password } = req.body;
  
  let user = await User.findOne({ email });


  if (user) {
    return res.json({
      success: false,
      message: "User already exists",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  user = await User.create({
    name,
    phoneNumber,
    address,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.cookie("token", token, {
    httpOnly: true,
    maxAge: 30 * 60 * 1000,
   
  }).json({
    token,
    success: true,
    messafe: "registered successfully"
  });
    
    
}


export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email }).select("+password");

  if (!user) return res.json({ success: false, message: "user doesn't exist" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return res.json({ success: false, message: "Invalid password" });

  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res.
    cookie("token", token, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    })
    .json({
      token,
      success: true,
      message: `Welcome back ${user.name}`,
    });
};

export const getMyProfile = (req, res) => {

  res.json({
    success: true,
    user:req.user,
  });
};



  
  export const editProfile = async (req, res) => {
    const { name, phoneNumber, address } = req.body;
    const userId = req.user._id; // Assuming you have middleware to populate req.user with the authenticated user
  
    try {
      let user = await User.findById(userId);
  
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "User not found",
        });
      }
  
      // Update user's information
      if (name) user.name = name;
      if (phoneNumber) user.phoneNumber = phoneNumber;
      if (address) user.address = address;
  
      // Save the updated user
      await user.save();
  
      res.json({
        success: true,
        message: "Profile updated successfully",
        user: user,
      });
    } catch (error) {
      console.error("Error editing profile:", error);
      res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  





export const logout= (req, res) =>{

  res.cookie("token", "", {
    expires: new Date(Date.now())
  }).json({
    sucess: true,
    message:"Log out successfully"
  })

  
}

export const getAllUsers =async (req, res) => {
  
  const users = await User.find();
  
  if (!users) {
    return res.status(404).json({
      success: false,
      message: "Users not found",
    });
  }

  res.json({
    success: true,
    users,
  });


}


export const deleteuser = async(req, res) =>{
  
  const { id } = req.params;


  try {

    const user = await User.findById(id);
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    await user.deleteOne();

    res.json({
      success: true,
      message: "User deleted successfully",
    });

    User.save();
  



    
  } catch (error) {
    console.log(error);
  }

  
}



