const express = require("express");
const colors = require("colors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

//importing error-Handling Middleware
const {
  notfoundErrorHandler,
  customDefaultErrorHandler,
} = require("./Middleware/err/customDefaultErrHandler");

//importing mongoose connector
const connectDatabase = require("./Config/Db");

//importing ROUTERS
const AuthRouter = require("./Routers/AuthRouter");
const UserRouter = require("./Routers/UserRouter");
const ChatRouter = require("./Routers/ChatRouter");
const MessageRouter = require("./Routers/MessageRouter");
const NotifyRouter = require("./Routers/NotifyRouter");

//CONNECT TO DB
connectDatabase();

// GENRATE APP
const app = express();

//TO PARSE COOKIES
app.use(cookieParser());

// PARES THE JSON RES
app.use(express.json());

//TO USE DATA OF .env FILE
dotenv.config();

// SET PORT NUMBER
const port = process.env.PORT || 5000;

//CONNECT ALL ROUTERS
app.use("/auth", AuthRouter); // routes -> getData/ login/ signin/ logout
app.use("/user", UserRouter);
app.use("/chat", ChatRouter);
app.use("/message", MessageRouter);
app.use("/notify", NotifyRouter);

//ERROR HANDELING
app.use(notfoundErrorHandler); //404->not found error handeling
app.use(customDefaultErrorHandler); //500->custom default err handeling

// LISTNING PORT
app.listen(port, () => {
  console.log(`chat-app listening on the port ${port}`.yellow.bold);
});
