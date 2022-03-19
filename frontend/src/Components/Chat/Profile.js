import React from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuItemOption,
  MenuGroup,
  MenuOptionGroup,
  MenuDivider,
  IconButton,
  Button,
} from "@chakra-ui/react";
import { FaUser } from "react-icons/fa";

function Profile() {
  return (
    <Menu>
      <MenuButton
        as={IconButton}
        icon={<FaUser />}
        color={"#fff"}
        size={"md"}
        isRound="true"
        bg="#1a3365"
        _hover={{ bg: "#ffbb00", color: "#1a3365" }}
      />
      <MenuList>
        <MenuItem color={"grey"} _hover={{ bg: "none" }}>
          MyName
        </MenuItem>
        <MenuDivider />
        <MenuItem color={"grey"} _hover={{ color: "yellow.500", bg: "none" }}>
          {`LogOut`}
        </MenuItem>
      </MenuList>
    </Menu>
  );
}

export default Profile;
