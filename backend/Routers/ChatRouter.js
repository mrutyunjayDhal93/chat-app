//extarnal imports
const express = require("express");
const protected = require("../Middleware/validation/isLoggedin");

//Initialise Router
const ChatRouter = express.Router();

//IMP HANDLER
const { createChatHandler } = require("../Handler/chatHandler");
const { getChatDataHandler } = require("../Handler/chatHandler");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  create a new chat
    api : /chat/createchat
    req : user-{id,name}
    res : chatId [201]/[200 **present]/[403]  
*/
ChatRouter.route("/createchat").post(protected, createChatHandler);

/*  
    description :  get all messages of a chat
    api : /chat/data
    req : chat-id
    res : messages [200]/[500]
*/
ChatRouter.route("/data").post(protected, getChatDataHandler);

//EXPORT CHAT-ROUTE
module.exports = ChatRouter;
