import { useState, useEffect } from "react";
import SigninImg from "../../Assets/Img/SiginImg.svg";
import { useAuth } from "../../Context/AuthContext";
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
  Heading,
  Spacer,
  Flex,
  Text,
  Center,
  Box,
  HStack,
} from "@chakra-ui/react";

function Signin() {
  //get signin fun & auth status from AuthContext
  const { authCheck, dispatch, signin } = useAuth();

  //set all inputs State
  const [name, setname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");

  //set navigater
  const navigate = useNavigate();

  //set onClick for signin btn
  const submitSigninBtn = () => {
    signin(name, email, password, confpassword);
  };

  //After signin btn get clicked navigate to login form
  useEffect(() => {
    if (authCheck) {
      /*navigate to login*/
      navigate("/auth/login", {
        replace: true,
      });
    }
  }, [authCheck]);

  return (
    <Flex justify="center" alignContent="center" h="100vh" p={8} bg={"#FFF"}>
      <Center>
        <HStack
          bg={{ sm: "#FFBB00", md: "#fff" }}
          boxShadow="lg"
          p={8}
          rounded="lg"
          justifyContent={"space-between"}
        >
          {/* Illustartion */}
          <Image
            src={SigninImg}
            d={{ sm: "none", md: "block" }}
            boxSize="sm"
            objectFit="cover"
            alt="Log-in Img"
          />

          <Spacer />
          {/* Signin form */}

          <VStack spacing={4}>
            <Heading size="lg">SignUp</Heading>

            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                bg={"#FFBB00"}
                type="text"
                _placeholder={{ color: "#1A3365", opacity: "75%" }}
                placeholder="Enter your Name"
                borderWidth={"2px"}
                borderColor={"#1A3365"}
                _hover={{ borderColor: "#1A3365" }}
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />

              <FormLabel>Email</FormLabel>
              <Input
                bg={"#FFBB00"}
                type="email"
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
              <FormLabel>Conferm Password</FormLabel>
              <Input
                bg={"#FFBB00"}
                type="password"
                _placeholder={{ color: "#1A3365", opacity: "75%" }}
                placeholder="********"
                borderWidth={"2px"}
                borderColor={"#1A3365"}
                _hover={{ borderColor: "#1A3365" }}
                value={confpassword}
                onChange={(e) => {
                  setconfpassword(e.target.value);
                }}
              />

              {/* --- Signin/login Buttons--- */}
              <Stack
                marginTop={4}
                direction={{ sm: "column", md: "row" }}
                justifyContent="space-between"
                align="stretch"
              >
                {/*btn for submiting sign up form*/}
                <Button
                  type="submit"
                  bg="#1A3365"
                  variant="solid"
                  color="white"
                  _hover={{ bg: "1A3365" }}
                  onClick={submitSigninBtn}
                >
                  Signin
                </Button>

                {/*user already has an account*/}
                <Link to="/auth/login">
                  <Box alignSelf={{ sm: "flex-end", md: "center" }}>
                    <Text fontSize={{ sm: "md", md: "sm" }}>login→</Text>
                  </Box>
                </Link>
              </Stack>
            </FormControl>
          </VStack>
        </HStack>
      </Center>
    </Flex>
  );
}

export default Signin;
