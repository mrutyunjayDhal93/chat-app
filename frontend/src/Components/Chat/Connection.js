import React from "react";
import { Box, HStack, IconButton } from "@chakra-ui/react";
import { BsFillChatQuoteFill } from "react-icons/bs";
import { useChat } from "../../Context/ChatContext";
function Connection({ connection, dis, setdis }) {
  const { createChat } = useChat();

  const buildChat = () => {
    console.log(connection);
    createChat(connection);
    setdis(!dis);
  };

  return (
    <HStack
      w="100%"
      px={4}
      bg={"#ffbb00"}
      justifyContent={"space-between"}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box color="#1a3365" fontWeight={"bold"}>
        {connection.name}
      </Box>
      <IconButton
        ml={2}
        icon={<BsFillChatQuoteFill />}
        width={2}
        color="#1a3365"
        bg="none"
        _hover={{ bg: "none" }}
        onClick={buildChat}
      />
    </HStack>
  );
}

export default Connection;
