//extarnal imports
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
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

// internal imports
import LoginImg from "../../Assets/Img/LoginImg.svg";
import { useAuth } from "../../Context/AuthContext";

function Login() {
  //get login fun & auth status from AuthContext
  const { authCheck, dispatch, login } = useAuth();

  //set all input's states
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  //set navigater
  const navigate = useNavigate();

  //set onClick for login btn
  const submitLoginBtn = () => {
    login(email, password);
  };

  //After login btn get clicked navigate to chat ui
  useEffect(() => {
    if (authCheck) {
      /*navigate to chat ui*/
      navigate("/chat", {
        replace: true,
      });
    }
  }, [authCheck]);

  return (
    <Flex justify="center" alignContent="center" h="100vh" p={8} bg={"#FFF"}>
      <Center>
        <Stack
          bg={{ sm: "#FFBB00", md: "#fff" }}
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
            <Heading size="lg" mt={4}>
              Login
            </Heading>

            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input
                bg={"#FFBB00"}
                type="email"
                fontWeight={"bold"}
                _placeholder={{ color: "#1A3365", opacity: "75%" }}
                placeholder="test@some.com"
                borderWidth={"2px"}
                borderColor={"#1A3365"}
                _hover={{ borderColor: "#1A3365" }}
                value={email}
                onChange={(e) => {
                  setemail(e.target.value);
                }}
              />

              <FormLabel>Password</FormLabel>
              <Input
                bg={"#FFBB00"}
                type="password"
                fontWeight={"bold"}
                _placeholder={{ color: "#1A3365", opacity: "75%" }}
                placeholder="********"
                borderWidth={"2px"}
                borderColor={"#1A3365"}
                _hover={{ borderColor: "#1A3365" }}
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
                  bg="#1A3365"
                  variant="solid"
                  color="#fff"
                  _hover={{ bg: "1A3365" }}
                  onClick={submitLoginBtn}
                >
                  Login
                </Button>

                {/*if user don't have any account*/}
                <Link to="/auth/signin">
                  <Box as="l" alignSelf={{ sm: "flex-end", md: "center" }}>
                    <Text fontSize={{ sm: "md", md: "sm" }}>← signin</Text>
                  </Box>
                </Link>
              </Stack>
            </FormControl>
          </VStack>
        </Stack>
      </Center>
    </Flex>
  );
}

//export log-in component
export default Login;
