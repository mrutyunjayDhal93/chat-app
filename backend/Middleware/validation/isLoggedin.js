const jwt = require("jsonwebtoken");
require("dotenv").config();

const isloggedin = async (req, res, next) => {
  try {
    const Token = await req.cookies.jwttoken;
    const decode = jwt.verify(Token, process.env.JWT_SECRET);

    const { id, name, email } = decode;

    req.userId = id;
    req.userName = name;
    req.userEmail = email;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: "Authentication faield! ",
    });
  }
};

module.exports = isloggedin;
