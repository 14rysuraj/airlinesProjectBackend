import express from "express";

import {

  deleteuser,
  editProfile,
  getAllUsers,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("nice");
})
router.post("/users/new", register);
router.post("/users/login", login);
router.get("/users/me", isAuthenticated, getMyProfile);
router.post("/users/edit",isAuthenticated,editProfile);
router.get("/users/logout", logout);
router.get("/users/allusers", getAllUsers);
router.delete("/users/delete/:id", deleteuser);


//Dynamic id  for update and delete a particular user by its ID

export default router;
