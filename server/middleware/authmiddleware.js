const jwt = require("jsonwebtoken");
require("dotenv").config();
const auth = (req, res, next) => {
  try {
    // Getting token from header
    const token = req.header("authorization").split(" ")[1];
    const decryptedToken = jwt.verify(token, process.env.secretKey);
    req.body.userId = decryptedToken.userId;
    next();
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  auth,
};
