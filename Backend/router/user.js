const express = require("express");
const {
  createUser,
  loginUser,
} = require("../controller/userController");

// const authUser = require("../middleware/userAuth");

const userRouter = express.Router();

//making rote for creating a new user
userRouter.post("/createuser", createUser);
// making route for login user
userRouter.post("/loginuser", loginUser);

module.exports = userRouter;
