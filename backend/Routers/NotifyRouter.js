//extarnal imports
const express = require("express");
const protected = require("../Middleware/validation/isLoggedin");

//Initialise Router
const NotifyRouter = express.Router();

// IMP HANDLER
const { pingToNotify } = require("../Handler/notifyHandler");
const { deleteNotification } = require("../Handler/notifyHandler");

/*--------------------- CREATE ROUTERS ----------------------- */
/*  
    description :  get all pings in notification formate
    api : /notify/
    req : 
    res : notificationList-[code, connectionName] [200]/[404]/[500]
*/
NotifyRouter.route("/").get(protected, pingToNotify);

/*  
    description :  to delete iteam from ping array
    api : /notify/delete/:id
    method : DELETE [PROTECTED]
    req : params : notificationId 
    res :  [200]/[500]
*/
NotifyRouter.route("/delete/:id").delete(protected, deleteNotification);

//export Router
module.exports = NotifyRouter;
