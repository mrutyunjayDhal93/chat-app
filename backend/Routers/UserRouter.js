//extarnal imports
const express = require("express");
const protected = require("../Middleware/validation/isLoggedin");

//Initialise Router
const UserRouter = express.Router();

//IMP HANDLER
const { addConnectionHandler } = require("../Handler/userHandler");
const { getConnectionHandler } = require("../Handler/userHandler");
const { getConnectionByIdHandler } = require("../Handler/userHandler");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  add a new connection
    api : /user/addconnection
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
UserRouter.route("/addconnection").post(protected, addConnectionHandler);

/*  
    description :  get all connected connections 
    api : /user/
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
UserRouter.route("/").get(protected, getConnectionHandler);

/*  
    description :  get all connected connections 
    api : /user/:connectionId
    req : 
    parameters : connection-id  
    res : ** Not Done Yet **   
*/
UserRouter.route("/:connectionId").get(protected, getConnectionByIdHandler);

//EXPORT USER-ROUTER
module.exports = UserRouter;
