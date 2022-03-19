import { Box, Button, HStack, Input, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useChat } from "../../Context/ChatContext";
import MessageList from "./MessageList";

function Chatroom() {
  const [inputContent, setinputContent] = useState("");
  const [currentChatId, setcurrentChatId] = useState(null);

  const { sendMessage, receiveMessage, selectedChat } = useChat();

  useEffect(() => {
    selectedChat && setcurrentChatId(selectedChat.chatId);
    setinputContent("");
    receiveMessage(selectedChat.chatId);
  }, [selectedChat]);

  const submitMsg = (e) => {
    e.preventDefault();
    inputContent && currentChatId && sendMessage(inputContent, currentChatId);
    setinputContent("");
  };

  return (
    <Box
      d="flex"
      flexDir="column"
      justifyContent="flex-end"
      p={3}
      bg="gray.50"
      w="100%"
      h="100%"
      borderRadius="lg"
      overflowY="hidden"
    >
      <MessageList />

      {/* MESSAGE INPUT AREA */}
      <HStack>
        <Input
          type="text"
          fontSize={"lg"}
          color={"#1a3365"}
          fontWeight={"semibold"}
          bg={"#FFBB00"}
          placeholder="write your message..."
          _placeholder={{ color: "#1A3365", opacity: "75%" }}
          borderWidth={"2px"}
          borderColor={"#1A3365"}
          _hover={{ borderColor: "#1A3365" }}
          value={inputContent}
          onChange={(e) => {
            setinputContent(e.target.value);
          }}
        />
        <Button
          type="submit"
          bg={"#1A3365"}
          _hover={{ bg: "#1a3365" }}
          color="#FFF"
          fontWeight={"bold"}
          onClick={submitMsg}
        >
          SEND
        </Button>
      </HStack>
    </Box>
  );
}

export default Chatroom;
