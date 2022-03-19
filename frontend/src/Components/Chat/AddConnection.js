import {
  Box,
  Button,
  Flex,
  HStack,
  IconButton,
  Input,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useChat } from "../../Context/ChatContext";
import Modals from "../../Utility/ultChat/Modals";
import Notification from "./Notification";
import Profile from "./Profile";
import { IoMdAdd } from "react-icons/io";
import { BsArrowRight } from "react-icons/bs";

function AddConnection({ dis, setdis }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [cheetCode, setcheetCode] = useState("");
  const { newConnection, setnewConnection, makeConnection } = useChat();

  useEffect(() => {
    cheetCode && makeConnection(cheetCode);
    newConnection && setnewConnection({});
    setcheetCode("");
  }, [cheetCode]);

  const widthChange = () => {
    setdis(!dis);
  };

  return (
    <HStack
      py={2}
      mt={2}
      justifyContent={{ sm: "space-between", md: "flex-end" }}
    >
      <HStack px={2}>
        <Profile />
        <Notification />
        <IconButton
          icon={<IoMdAdd />}
          color={"#fff"}
          size={"md"}
          isRound="true"
          bg="#1a3365"
          _hover={{ bg: "#ffbb00", color: "#1a3365" }}
          onClick={onOpen}
        />
      </HStack>
      <IconButton
        icon={<BsArrowRight />}
        d={{ sm: "block", md: "none" }}
        color={"#1a3365"}
        fontSize="bold"
        size={"lg"}
        isRound="true"
        bg="none"
        _hover={{ bg: "none" }}
        onClick={widthChange}
      />

      <Modals
        isOpen={isOpen}
        onClose={onClose}
        setcheetCode={setcheetCode}
      ></Modals>
    </HStack>
  );
}

export default AddConnection;
