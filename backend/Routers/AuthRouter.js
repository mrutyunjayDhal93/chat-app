const express = require("express");
const protected = require("../Middleware/validation/isLoggedin");

//importting all Validators
const {
  signinValidator,
  loginValidation,
  authValidation,
} = require("../Middleware/validation/reqValidator");

//Initialise Router
const AuthRouter = express.Router();

//IMP HANDLER
const {
  getDataHandler,
  signinHandler,
  loginHandler,
  logoutHandler,
} = require("../Handler/authHandler");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  GET USER DATA
    api : /auth/
    method : GET [PROTECTED]
    req : 
    res : User-{name,email} [200]/[401]  
*/
AuthRouter.get("/", protected, getDataHandler);

/*  
    description :  signin to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/
AuthRouter.post("/signin", signinValidator, authValidation, signinHandler);

/*  
    description :  user get logged in
    api : /auth/login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
*/
AuthRouter.post("/login", loginValidation, authValidation, loginHandler);

/* TODO: 
    description :  Logged out user 
    api : /auth/logout
    method : POST [PROTECTED]
    req : **not done yet
    res : **not done yet 
*/
AuthRouter.post("/logout", logoutHandler);

//EXPORT AUTH-ROUTER
module.exports = AuthRouter;
