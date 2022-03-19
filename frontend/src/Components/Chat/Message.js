import { Box, Text } from "@chakra-ui/react";
import React from "react";

function Message({ pos, content }) {
  return (
    <Box
      px={{ sm: 2, md: 3 }}
      d="flex"
      justifyContent={pos === "r" ? "flex-end" : "flex-start"}
    >
      <Box
        p={3}
        borderRadius="md"
        bg={pos === "r" ? "#FFBB00" : "#1A3365"}
        boxShadow="xl"
        borderWidth={"2px"}
        borderColor={"#1A3365"}
      >
        <Text
          align={"center"}
          color={pos === "l" ? "#FFF" : "#1A3365"}
          fontSize={"lg"}
          fontWeight={"semibold"}
        >
          {content}
        </Text>
      </Box>
    </Box>
  );
}

export default Message;
