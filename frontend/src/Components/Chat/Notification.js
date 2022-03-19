import React from "react";

import { IoMdNotifications } from "react-icons/io";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  IconButton,
  Button,
  HStack,
  Text,
} from "@chakra-ui/react";
import { useChat } from "../../Context/ChatContext";

function Notification() {
  const { NotificationList, makeConnection, deleteNotification } = useChat();

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<IoMdNotifications />}
        isRound={true}
        color={"#fff"}
        bg={"#1a3365"}
        size={"md"}
        _hover={{ bg: "#ffbb00", color: "#1a3365" }}
      />
      <MenuList>
        {NotificationList.map((notification) => {
          return (
            <MenuItem
              key={notification._id}
              bg="yellow.300"
              color={"green.900"}
              _hover={{ bg: "yellow.300" }}
            >
              <HStack justifyContent={"space-between"}>
                <Text>
                  {`${notification.connectionName} wants connect with you!`}
                </Text>
                <Button
                  bg="non"
                  size={"sm"}
                  _hover={{ bg: "yellow.300" }}
                  onClick={() => {
                    makeConnection(notification.code);
                    deleteNotification(notification._id);
                  }}
                >
                  Accept
                </Button>
              </HStack>
              <MenuDivider />
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default Notification;
