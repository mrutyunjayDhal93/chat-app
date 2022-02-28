const jwt = require("jsonwebtoken");

require("dotenv").config();

//generating jwt Token
const generateToken = (id, name, email) => {
  //generate Token
  const token = jwt.sign(
    {
      id,
      name,
      email,
    },
    process.env.JWT_SECRET, //`#556y389y%hdyfgidhg!084754&`,
    {
      expiresIn: process.env.TOKEN_EXPIRES,
    }
  );

  return token;
};

module.exports = generateToken;
