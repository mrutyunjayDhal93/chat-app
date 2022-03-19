//extarnal imports
const express = require("express");
const protected = require("../Middleware/validation/isLoggedin");

//Initialise Router
const MessageRouter = express.Router();

// IMP HANDLER
const { sendMessageHandler } = require("../Handler/messageHandler");
const { getMessageHandler } = require("../Handler/messageHandler");

/*--------------------- CREATE ROUTERS ----------------------- */
/*  
    description :  send new message
    api : /message/send
    req : content,chat-id
    res : content [201]/[500]  
*/
MessageRouter.route("/send").post(protected, sendMessageHandler);

/*  
    description :  send new message
    api : /message/send
    req : content,chat-id
    res : content [200]/[500]  
*/
MessageRouter.route("/").get(protected, getMessageHandler);

//export Router
module.exports = MessageRouter;
