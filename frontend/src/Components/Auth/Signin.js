import { useState, useEffect } from "react";
import SigninImg from "../../Assets/Img/SiginImg.svg";
import { useAuth } from "../../Context/AuthContext";
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
} from "@chakra-ui/react";

function Signin() {
  //get signin fun & auth status from AuthContext
  const { authcheck, dispatch, signin } = useAuth();
  //set all inputs State
  const [name, setname] = useState("");
  const [phone, setphone] = useState("");
  const [password, setpassword] = useState("");
  const [confpassword, setconfpassword] = useState("");
  //set onClick for signin btn
  const submitSigninBtn = () => {
    signin(name, phone, password, confpassword);
  };
  //After signin btn get clicked navigate to login form
  useEffect(() => {
    if (authcheck) {
      /*navigate to login*/
    }
  }, [authcheck]);

  return (
    <Flex justify="center" alignContent="center" h="100vh" p={8}>
      <Center>
        <Stack
          boxShadow="lg"
          py="4"
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
            src={SigninImg}
            boxSize={{ sm: "0px", md: "sm" }}
            objectFit="cover"
            alt="Log-in Img"
          />

          <Spacer />
          {/* Signin form */}

          <VStack spacing={4} py={{ sm: 0.5, md: 4 }} align="stretch">
            <Heading size="lg">SignUp</Heading>

            <FormControl>
              {/* Enter User Name */}
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                placeholder="Enter your Name"
                value={name}
                onChange={(e) => {
                  setname(e.target.value);
                }}
              />

              {/* Enter phone number */}
              <FormLabel>Phone Number</FormLabel>
              <Input
                type="number"
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
              {/* Conferm Password*/}
              <FormLabel>Conferm Password</FormLabel>
              <Input
                type="password"
                placeholder="********"
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
                <Button
                  type="submit"
                  bg="yellow.400"
                  variant="solid"
                  color="black"
                  onClick={submitSigninBtn}
                >
                  Signin
                </Button>
                <Box alignSelf={{ sm: "flex-end", md: "center" }}>
                  <Text fontSize={{ sm: "md", md: "sm" }}>login→</Text>
                </Box>
              </Stack>
            </FormControl>
          </VStack>
        </Stack>
      </Center>
    </Flex>
  );
}

export default Signin;
