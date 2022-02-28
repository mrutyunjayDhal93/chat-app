const express = require("express");
const isloggedin = require("../Middleware/validation/isLoggedin");

//importting all Validators
const {
  signinValidator,
  loginValidation,
  authValidation,
} = require("../Middleware/validation/reqValidator");

//importting Auth related Handlers
const {
  getDataHandler,
  signinHandler,
  loginHandler,
  logoutHandler,
} = require("../Handler/authHandler");

//generate the router
const AuthRouter = express.Router();

/* -------------------MAKE ALL AUTH-ROUTERS CALL----------------- */

//Router for getting data if user allready been logged-in
AuthRouter.get("/", isloggedin, getDataHandler);

//Router for signin
AuthRouter.post("/signin", signinValidator, authValidation, signinHandler);

//Router for login
AuthRouter.post("/login", loginValidation, authValidation, loginHandler);

//Router for Logout
AuthRouter.post("/logout", logoutHandler);

//EXPORT AUTH-ROUTER MODULE
module.exports = AuthRouter;
