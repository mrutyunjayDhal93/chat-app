//internal models imports
const User = require("../models/userModel");

/*------------------------- CREATE Notify-HANDLERS ------------------------ */
/*  
    description :  get all pings in notification formate
    api : /notify/
    method : GET [PROTECTED]
    req : 
    res : notificationList-[code, connectionName] [200]/[404]/[500]
*/
const pingToNotify = async (req, res) => {
  const userId = req.userId;

  try {
    const currentUser = await User.findById({ _id: userId });

    const notificationList = currentUser.ping;

    if (notificationList && notificationList.length > 0) {
      res.status(200).json({
        success: true,
        notificationList,
        msg: "all notification successfully retrive!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "no ntification",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "no ntification",
    });
  }
};

/*  
    description :  get all pings in notification formate
    api : /notify/delete/:id
    method : DELETE [PROTECTED]
    req : params : id - of iteam from ping arrray to delete
    res :  [200]/[500]
*/
const deleteNotification = async (req, res) => {
  const userId = req.userId;
  const notificationId = req.params.id;

  try {
    const data = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: {
          ping: { _id: notificationId },
        },
      }
    );
    console.log(data);
    res.status(200).json({
      success: false,
      msg: "one notification successfully deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "cann't able to delete!",
    });
  }
};

//export all notify-handlers
module.exports = {
  pingToNotify,
  deleteNotification,
};
