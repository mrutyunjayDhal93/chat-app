//extarnal imports
const bcrypt = require("bcryptjs");
const generateToken = require("../Utility/generateToken");

//internal models imports
const User = require("../models/userModel");

/*------------------------- CREATE AUTH-HANDLERS ------------------------ */
/*  
    description :  GET USER DATA
    api : /auth/
    method : GET [PROTECTED]
    req : 
    res : User-{name,email} [200]/[401]  
*/
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

/*  
    description :  signin to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/

const signinHandler = async (req, res) => {
  /*  
  STEPS TO DO :
      ->get name,emai,password
      ->generate salte
      ->bcrypt password by that salt
      ->make user by persing data to User-Model
  */

  /*FIXME: cheetcode should be generated after signin , not get from body */

  //get all data from req
  const { name, email, password, cheetCode } = req.body;

  //generate salte
  const newsalt = await bcrypt.genSalt(10);
  //hashing password
  const hashedPassword = bcrypt.hashSync(password, newsalt); // @Todo: parse the password in bcrypt
  try {
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      cheetCode,
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

/*  
    description :  user get logged in
    api : /auth/login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
*/
const loginHandler = async (req, res) => {
  /*
  STEPS TO DO :
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
            maxAge: 36000000,
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
      // ** NOTE: we could send 400[Bad request]...but for sequrity 401 has been sended
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

/*  TODO:
    description :  Logged out user 
    api : /auth/logout
    method : POST [PROTECTED]
    req : **not done yet
    res : **not done yet 
*/
const logoutHandler = async (req, res) => {};

//EXPORT ALL AUTH HADLERS
module.exports = {
  getDataHandler,
  signinHandler,
  loginHandler,
  logoutHandler,
};
