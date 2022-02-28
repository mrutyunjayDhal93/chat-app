// 404 NOT FOUND ERROR
const notfoundErrorHandler = (req, res, next) => {
  const err = new Error(`Not Found - ${req.originalUrl}`);

  res.status(404);
  next(err);
};

// CUSTOM DEFAULT ERROR HANDLER
const customDefaultErrorHandler = (err, _req, res, next) => {
  //HEADER SHOULD NOT BE SENDED BEFORE
  if (res.headersSent) {
    next("there was a problem!");
  } else {
    //STATUS CODE SHOULD NOT BE 200
    const statusCode = res.status.Code === 200 ? 500 : res.status.Code;

    res.status(statusCode).json({
      msg: err.message,
    });
  }
};

//EXPORT ERROR HANDELRS
module.exports = {
  notfoundErrorHandler,
  customDefaultErrorHandler,
};
