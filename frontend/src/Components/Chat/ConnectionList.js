import { Box, StackDivider, VStack } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useChat } from "../../Context/ChatContext";
import Connection from "./Connection";

function ConnectionList({ dis, setdis }) {
  // const [connections, setconnections] = useState([]);
  const { connectionList } = useChat();

  return (
    <Box mt={2}>
      <VStack divider={<StackDivider />} w="100%" alignItems="stretch">
        {connectionList.map((connection) => {
          return (
            <Connection
              key={connection.id}
              connection={connection}
              dis={dis}
              setdis={setdis}
            />
          );
        })}
      </VStack>
    </Box>
  );
}
export default ConnectionList;
