//internal models imports
const Msg = require("../models/msgModel");

/*------------------------- CREATE HANDLERS ------------------------ */
/*  
    description :  send new message
    api : /message/send
    method : POST [PROTECTED]
    req : content,chat-id
    res : messageInfo-{content,msgId,position} [201]/[500]  
*/
const sendMessageHandler = async (req, res) => {
  const senderId = req.userId;
  const { content, chatId } = req.body;

  try {
    const msgInformation = {
      content,
      chatId,
      senderId,
    };
    //store new msg in DB
    const message = await Msg.create(msgInformation);
    await message.save();
    //msg successfully stored
    res.status(201).json({
      success: true,
      messageInfo: {
        content: content,
        msgId: message._id,
        position: "r",
      },
      msg: "new message successfully created!",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "message creation failed!",
    });
  }
};

/*  
    description :  get single message [NOTE** get all message of a chat done in chat Router]
    api : /message/
    method : GET [PROTECTED]
    req : msg-id
    res : content [200]/[404]/[500]  
*/
const getMessageHandler = async (req, res) => {
  const { msgId } = req.body;
  try {
    const { content } = await Msg.findById({ _id: msgId });

    if (content) {
      //getting msg successfull
      res.status(200).json({
        success: true,
        content,
        msg: "getting single msg successfull!",
      });
    } else {
      //getting msg failed
      res.status(404).json({
        success: false,
        msg: "getting msg failed!",
      });
    }
  } catch (err) {
    //getting msg failed
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "getting msg failed!",
    });
  }
};

//export all handler
module.exports = {
  sendMessageHandler,
  getMessageHandler,
};
