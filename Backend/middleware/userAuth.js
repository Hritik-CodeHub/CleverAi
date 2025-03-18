const jwt = require("jsonwebtoken");

const authUser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).json({ message: "User token is missing" });
  } else {
    try {
      const data = jwt.verify(token, process.env.SECRET);
      req.user = data;
      next();
    } catch (error) {
      console.log("internal server error", error);
      res.status(400).json({ message: "internal server error authtoken" });
    }
  }
};
module.exports = authUser;
