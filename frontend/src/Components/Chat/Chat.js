import React, { useEffect, useState } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Text,
  Heading,
  IconButton,
} from "@chakra-ui/react";
import ConnectionList from "./ConnectionList";
import Chatroom from "./Chatroom";
import AddConnection from "./AddConnection";
import { useChat } from "../../Context/ChatContext";
import Notification from "./Notification";
import { BsArrowLeft } from "react-icons/bs";

function Chat() {
  //Context state call
  const { getAllConnections, selectedChat, notify } = useChat();

  const [dis, setdis] = useState(false);
  const [currentChat, setcurrentChat] = useState(false);

  //Get all connections one time
  useEffect(() => {
    getAllConnections();
    notify();
  }, []);

  useEffect(() => {
    selectedChat && setcurrentChat(true);
  }, [selectedChat]);

  return (
    <Box>
      <HStack p={2}>
        {/* connection List */}
        <Box
          d={{ sm: dis ? "block" : " none", md: "block" }}
          bg="gray.50"
          w={{ sm: "100%", md: "35%", lg: "25%" }}
          h={"100vh"}
          px={4}
          borderColor={"#1a3365"}
          borderRadius="lg"
          borderWidth="2px"
        >
          <AddConnection dis={dis} setdis={setdis} />
          <ConnectionList dis={dis} setdis={setdis} />
        </Box>

        {/* chatroom */}
        <Box
          d={{ sm: !dis ? "flex" : "none", md: "flex" }}
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          p={4}
          h="100vh"
          bg="white"
          w={{ sm: "100%", md: "65%", lg: "75%" }}
          borderColor={"#1a3365"}
          borderRadius="lg"
          borderWidth="2px"
        >
          {currentChat ? (
            <>
              <HStack px={1} w={"100%"} justifyContent="space-between">
                <IconButton
                  icon={<BsArrowLeft />}
                  d={{ sm: "flex", md: "none" }}
                  color={"#1a3365"}
                  size={"lg"}
                  isRound="true"
                  bg={"none"}
                  _hover={{ bg: "none" }}
                  onClick={() => {
                    setdis(!dis);
                  }}
                />

                <Heading
                  fontWeight={"bold"}
                  color="#1a3365"
                  alignItems={"center"}
                >
                  {selectedChat.chatName}
                </Heading>
              </HStack>

              <Chatroom />
            </>
          ) : (
            <>
              <IconButton
                icon={<BsArrowLeft />}
                d={{ sm: "flex", md: "none" }}
                color={"#1a3365"}
                size={"lg"}
                isRound="true"
                bg={"none"}
                _hover={{ bg: "none" }}
                onClick={() => {
                  setdis(!dis);
                }}
              />
              <Text color={"gray.400"} textAlign="center">
                please connect with your connections!
              </Text>
            </>
          )}
        </Box>
      </HStack>
    </Box>
  );
}

export default Chat;
