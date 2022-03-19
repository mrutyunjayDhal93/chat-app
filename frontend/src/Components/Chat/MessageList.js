import { Box, VStack, Text } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useChat } from "../../Context/ChatContext";
import Message from "./Message";

function MessageList() {
  //  GET MESSAGE-LIST FROM CHAT-CONTEXT
  const { messageList, selectedChat } = useChat();

  useEffect(() => {
    console.log(messageList);
  }, [messageList]);

  if (messageList.length === 0) {
    return (
      <Text textAlign={"center"}>
        {`${selectedChat.chatName} waitting for your message`}{" "}
      </Text>
    );
  }

  return (
    <VStack w="100%" alignItems="stretch" p={4} mb={2}>
      {messageList.map((msg) => {
        return (
          <Message key={msg.msgId} pos={msg.position} content={msg.content} />
        );
      })}
    </VStack>
  );
}

export default MessageList;
