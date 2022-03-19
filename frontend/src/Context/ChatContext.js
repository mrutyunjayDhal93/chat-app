import React, { createContext, useContext, useState } from "react";
import axios from "axios";
import useAlertToast from "../Utility/ToastGenerater";

//CREATE CONTEXT
const chatContext = createContext();

//CUSTOM HOOK FOR useContext()
export const useChat = () => useContext(chatContext);

//WRAPPING FUNCTION FOR CHAT-PROVIDER
function ChatContextProvider({ children }) {
  //GOLBAL STATE HANDLERS
  const [selectedChat, setselectedChat] = useState(null); //{chat_id,user[]}
  const [messageList, setmessageList] = useState([]);
  const [newConnection, setnewConnection] = useState({});
  const [connectionList, setconnectionList] = useState([]);
  const [NotificationList, setNotificationList] = useState([]);

  //TOAST GENERATER
  const Toast = useAlertToast();

  /*------------------------- CREATE METHODS ------------------------ */

  /*...................... CONNECTION METHODS .......................*/
  /*  
      description :  add a new connection 
      api : /user/addconnection
      method : POST [PROTECTED]
      req : connection-cheetCode
      res : connectionInfo-{name,id} [201]/[400 **present]/[500]  
  */
  const makeConnection = async (cheetCode) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      //make the request
      const { data } = await axios.post(
        "/user/addconnection",
        { cheetCode: cheetCode },
        config
      );

      if (data) {
        const { connectionInfo } = data;

        setnewConnection(connectionInfo);
        setconnectionList((oldList) => {
          const newList = [connectionInfo, ...oldList];
          return newList;
        });
        Toast(
          "Congratulation!, you make a new connection successfully!",
          "success"
        );
      } else {
        Toast("connection could not able to make!", "error");
      }
    } catch (err) {
      console.log(err.message);
      Toast("connection could not able to make!", "error");
    }
  };

  /*  
      description : get all connected connections 
      api : /user/
      method : GET [PROTECTED]
      req : 
      res : allConnection-[] [200]/[500]  
  */
  const getAllConnections = async () => {
    try {
      const { data } = await axios.get("/user/");

      if (data) {
        const { allConnection } = data;
        setconnectionList([...allConnection]);
      } else {
        Toast("Sorry! you don't have any connection till now", "error");
      }
    } catch (err) {
      console.log(err.message);
      Toast("cann't get your connection detail!", "error");
    }
  };

  /*...................... CHAT METHODS ........................*/
  /*  
    description :  create a new chat
    api : /chat/createchat
    method : POST [PROTECTED]
    req : connection-{id,name}
    res : chatId [201]/[200 present]/[403]  
  */
  const createChat = async (connection) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      const { data } = await axios.post(
        "/chat/createchat",
        {
          connection: connection,
        },
        config
      );

      if (data) {
        const { chatId } = data;
        setselectedChat({ chatId, chatName: connection.name });
      } else {
        Toast("chat could not able to get!", "error");
      }
    } catch (err) {
      console.log(err.message);
      Toast("chat could not able to get!", "error");
    }
  };

  /*...................... MESSAGE METHODS ........................*/
  /*  
      description :  send new message
      api : /message/send
      method : POST 
      req : content,chat-id
      res : content,msgId   
 */
  const sendMessage = async (inputContent, currentChatId) => {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      // send new message
      const { data } = await axios.post(
        "/message/send",
        {
          content: inputContent,
          chatId: currentChatId,
        },
        config
      );
      //store new message in message_List
      if (data) {
        setmessageList([...messageList, data.messageInfo]);
      } else {
        Toast("message cann't able to send!", "error");
      }
    } catch (err) {
      //if someting will be wrong...
      console.log(err.message);
      Toast("message cann't able to send!", "error");
    }
  };

  /*  
      description :  get all messages of a chat
      api : /chat/data
      method : GET [PROTECTED]
      req : chat-id
      res : msgList-[{content,id,position},...] [200]/[404]/[500]
  */
  const receiveMessage = async (chatId) => {
    const config = {
      headers: {
        "content-type": "application/json",
      },
    };
    try {
      const { data } = await axios.post(
        "/chat/data",
        {
          chatId,
        },
        config
      );
      if (data) {
        const { msgList } = data;
        setmessageList([...msgList]);
      } else {
        setmessageList([]);
        Toast("message not found!", "error");
      }
    } catch (err) {
      console.log(err.message);
      setmessageList([]);
      Toast("message not found!", "error");
    }
  };

  /*...................... NOTIFICATION METHODS ........................*/
  /*  
    description :  get all pings in notification formate
      api : /notify/
      method : GET [PROTECTED]
      req : 
      res : notificationList-[code, connectionName] [200]/[404]/[500]
  */
  const notify = async () => {
    console.log("notifyme");
    try {
      const { data } = await axios.get("/notify/");

      if (data) {
        const { notificationList } = data;

        setNotificationList([...notificationList]);
      } else {
        setNotificationList([]);
      }
    } catch (err) {
      setNotificationList([]);
    }
  };

  /*  
      description :  get all pings in notification formate
      api : /notify/delete/:id
      method : DELETE [PROTECTED]
      req : params : id - of iteam from ping arrray to delete
      res :  [200]/[500]
  */
  const deleteNotification = async (notifyId) => {
    //delete from DB
    try {
      const { data } = await axios.delete(`/notify/delete/${notifyId}`);
    } catch (err) {
      Toast("cann't able to remove current notification!", "error");
    }
    //delete from local notification list
    setNotificationList((oldNotifications) => {
      const newNotifications = oldNotifications.filter((notification) => {
        return notification._id.toString() !== notifyId.toString();
      });

      return newNotifications;
    });
  };

  //STORE DATAS AS OBJ TO TRANSFER TO WRAPPED CMPONENTS
  const exportingChatValue = {
    newConnection,
    setnewConnection,
    connectionList,
    setconnectionList,
    selectedChat,
    setselectedChat,
    messageList,
    setmessageList,
    NotificationList,
    setNotificationList,
    sendMessage,
    receiveMessage,
    makeConnection,
    getAllConnections,
    createChat,
    notify,
    deleteNotification,
  };

  /*------------------------- RETURN TO RENDER ------------------------*/

  return (
    <chatContext.Provider value={exportingChatValue}>
      {children}
    </chatContext.Provider>
  );
}

//export chat-context component
export default ChatContextProvider;
