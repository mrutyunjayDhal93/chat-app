import React, { useState } from "react";
import LoginImg from "../../Assets/Img/LoginImg.svg";
import {
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Button,
  Image,
  Stack,
  VStack,
  Box,
  Text,
  Heading,
  Spacer,
  Flex,
  Center,
} from "@chakra-ui/react";

function Login() {
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  return (
    <Flex justify="center" alignContent="center" h="100vh" p={8}>
      <Center>
        <Stack
          boxShadow="lg"
          py="2"
          px="9"
          rounded="lg"
          direction={{
            sm: "column-reverse",
            md: "row",
          }}
          spacing="20px"
          align="stretch"
        >
          {/* Illustartion */}
          <Image
            src={LoginImg}
            boxSize={{ sm: "0px", md: "sm" }}
            objectFit="cover"
            alt="Log-in Img"
          />

          <Spacer />
          {/* Login form */}

          <VStack spacing={4}>
            <Heading size="lg">Login</Heading>

            <FormControl>
              {/* Enter phone number */}
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="phone"
                placeholder="91+"
                value={phone}
                onChange={(e) => {
                  setphone(e.target.value);
                }}
              />
              {/* Enter password */}
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
              />

              {/* ---Submition Login Button--- */}

              <Stack
                marginTop={4}
                direction={{ sm: "column", md: "row" }}
                justifyContent="space-between"
                align="stretch"
              >
                <Button bg="yellow.400" variant="solid" color="black">
                  Login
                </Button>
                <Box alignSelf={{ sm: "flex-end", md: "center" }}>
                  <Text fontSize={{ sm: "md", md: "sm" }}>← signin</Text>
                </Box>
              </Stack>
            </FormControl>
          </VStack>
        </Stack>
      </Center>
    </Flex>
  );
}

export default Login;
