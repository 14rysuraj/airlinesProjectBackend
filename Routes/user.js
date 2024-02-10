import express from "express";

import {

  displayUser,
  getMyProfile,
  login,
  logout,
  register,
} from "../controllers/user.js";

const router = express.Router();
router.get("/", (req, res) => {
  res.send("nice");
})
router.post("/users/new", register);
router.post("/users/login", login);
router.get("/users/me", getMyProfile);
router.get("/users/logout",logout );
router.get("/users/:id", displayUser);



//Dynamic id  for update and delete a particular user by its ID

export default router;
