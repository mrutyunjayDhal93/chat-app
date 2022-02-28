import React, { useState, useEffect } from "react";
import { useAuth } from "../../Context/AuthContext";
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
  //get login fun & auth status from AuthContext
  const { authcheck, dispatch, login } = useAuth();
  //set all input's states
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");

  //set onClick for login btn
  const submitLoginBtn = () => {
    login(phone, password);
  };
  //After login btn get clicked navigate to chat ui
  useEffect(() => {
    if (authcheck) {
      /*navigate to chat ui*/
    }
  }, [authcheck]);

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
                <Button
                  type="submit"
                  bg="yellow.400"
                  variant="solid"
                  color="black"
                  onClick={submitLoginBtn}
                >
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
