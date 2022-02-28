const { body, validationResult } = require("express-validator");

//SIGN-IN VALIDATOR
const signinValidator = [
  //UserName validation
  body("name")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 character!")
    .trim(),

  //Email Validation
  body("email")
    .isEmail()
    .withMessage("Must be a valid Email!")
    .normalizeEmail(),

  //Password validation
  body("password")
    .isStrongPassword()
    .withMessage(
      "password should have atlist 8 charecters and contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol "
    ),
];

//LOG-IN VALIDATOR
const loginValidation = [
  //Email validation
  body("email")
    .isEmail()
    .withMessage("Must be a valid Email!")
    .normalizeEmail(),
];

//CHECK IF ANY ERROR HAPPENED OR NOT
const authValidation = (req, res, next) => {
  //PUT ALL ERRORS AS INDIVIDUAL OBJ-ELEMENTS IN RESULT ARRAY
  const result = validationResult(req).array();

  //RESULT IS EMPTY, ERRORS ARE NOT OCCURED
  if (!result.length) {
    return next();
  }

  //RESULT IS NOT EMPTY, THEN ERRORS HAPPENED
  const error = result[0].msg;

  res.status(401).json({
    success: false,
    msg: error,
  });
};

//export all the checks
module.exports = {
  signinValidator,
  loginValidation,
  authValidation,
};
