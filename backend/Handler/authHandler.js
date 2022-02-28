const bcrypt = require("bcryptjs");

const generateToken = require("../Utility/generateToken");

//get User model from user Schema
const User = require("../models/userModel");

//HANDLER FOR GET USER DATA
const getDataHandler = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      User: {
        name: req.userName,
        email: req.userEmail,
      },
      msg: "getting user susseccfully!",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

//SIGNIN HANDLER
const signinHandler = async (req, res) => {
  /*@Todo:
      ->get name,emai,password
      ->generate salte
      ->bcrypt password by that salt
      ->make user by persing data to User-Model
      */
  //get all data from req
  const { name, email, password } = req.body;

  //generate salte
  const newsalt = await bcrypt.genSalt(10);
  //hashing password
  const hashedPassword = bcrypt.hashSync(password, newsalt); // @Todo: parse the password in bcrypt
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    await user.save();

    res.status(201).json({
      success: true,
      msg: "sing up successfull!",
    });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "registration failed!",
    });
  }
};

//LOGIN HANDLER
const loginHandler = async (req, res) => {
  /*@TODO
      ->get password & email
      ->put email in user model and check user exisit or not
      ->check given password with bcrypted password
  */
  const { email, password } = req.body;
  try {
    const user = await User.find({ email: email });
    if (user && user.length > 0) {
      //matching password
      const isMatchedPassword = await bcrypt.compareSync(
        password,
        user[0].password
      ); // @Todo parse password in bcrypt.compareSync(req.pass,user.pass)

      if (isMatchedPassword) {
        const { _id, name, email } = user[0];
        //generate token
        const token = generateToken(_id, name, email);

        //send to client by cookies
        res
          .status(200)
          .cookie("jwttoken", token, {
            maxAge: 360000,
            httpOnly: true,
          })
          .json({
            success: true,
            User: {
              name,
              email,
            },
            msg: "login successfull!",
          });
      } else {
        res.status(401).json({
          success: false,
          msg: "Authentication failed!",
        });
      }
    } else {
      //we could send 400[Bad request]...but for sequrity 401 has been sended
      res.status(401).json({
        success: false,
        msg: "Authentication failed!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

//@Todo:LOGOUT HANDLER
const logoutHandler = async (req, res) => {};

//EXPORT ALL HADLERS
module.exports = {
  getDataHandler,
  signinHandler,
  loginHandler,
  logoutHandler,
};
