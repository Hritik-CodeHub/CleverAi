const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//creating a new user using POST method /api/user/createuser
const createUser = async (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400).json({ message: "All fields are mendatory" });
  } else {
    //checking for user already exist or not
    const userExist = await User.findOne({ email });
    if (!userExist) {
      //hashing password using bcrypt
      const hashedPassword = await bcrypt.hash(password, 7);
      try {
        const create = await User.create({
          name,
          email,
          password: hashedPassword,
        });
        //returnign json web token in respose
        const authToken = jwt.sign(create.id, process.env.SECRET);
        res.status(200).json({
          message: "New user created successfully",
          authToken,
          success: true,
        });
      } catch (error) {
        console.log("user creating internal server error", error);
        res
          .status(400)
          .json({ message: "user creating internal server error" });
      }
    } else {
      res.status(400).json({ message: "Email already registered" });
    }
  }
};

//login a new user using POST method /api/user/loginuser
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400).json({ message: "All fields are mendatory" });
  } else {
    // checking for user exist or not
    const userExist = await User.findOne({ email });
    if (userExist) {
      // comparing the user input password and data base password
      const isCorrectPassword = await bcrypt.compare(
        password,
        userExist.password
      );
      if (isCorrectPassword) {
        // returning a json web token to logined user
        const authToken = jwt.sign(userExist.id, process.env.SECRET);
        res.status(200).json({
          message: "User login successfully",
          authToken,
          success: true,
        });
      } else {
        console.log("Please enter with right credentials");
        res.status(400).json({
          message: "Please enter with right credentials",
          success: false,
        });
      }
    } else {
      res.status(404).json({ message: "User does not exist" });
    }
  }
};

module.exports = {
  createUser,
  loginUser,
};
