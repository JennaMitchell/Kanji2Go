import {
  Input,
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Button,
  HStack,
  Image,
  Flex,
} from "@chakra-ui/react";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import classes from "./loginSide.module.css";
import blueTwitter from "../icons/twitter-blue.png";
import blueFacebook from "../icons/facebook-blue.png";
import google from "../icons/google.png";
import { storeActions } from "../store/store";
const LoginSide = () => {
  const dispatch = useDispatch();
  const closingIconHandler = () => {
    dispatch(storeActions.setLoginButtonClicked(false));
  };
  const signUpHandler = () => {
    dispatch(storeActions.setSignUpButtonClicked(true));
  };

  return (
    <div className={classes.mainContainer}>
      <XIcon
        className={classes.closingIcon}
        onClick={closingIconHandler}
      ></XIcon>

      <SimpleGrid
        w="90%"
        h="max-content"
        columns={1}
        columnGap={3}
        rowGap={6}
        mt="7%"
        ml="5%"
        justifyItems="center"
        alignItems="center"
      >
        <GridItem colSpan={1}>
          <Heading textAlign="center" fontSize="46px">
            Login
          </Heading>
          <Text
            fontSize={["14px", "16px", "16px", "18px", "18px", "18px"]}
            mt="10px"
          >
            Please enter your Login and Password
          </Text>
        </GridItem>
        <GridItem colSpan={1} w="80%">
          <FormControl>
            <FormLabel fontSize="20px">Username/Email</FormLabel>
            <Input
              placeholder="Username/Email"
              _placeholder={{ color: "black" }}
              bg="white"
              h="40px"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1} w="80%">
          <FormControl>
            <FormLabel fontSize="20px">Password</FormLabel>
            <Input
              placeholder="Password"
              bg="white"
              h="40px"
              _placeholder={{ color: "black" }}
            />
            <Text
              textAlign="end"
              mt="3px"
              _hover={{ color: "blue", textDecoration: "underline" }}
              fontSize={["14px", "16px", "16px", "18px", "18px", "18px"]}
            >
              Forgot password?
            </Text>
          </FormControl>
        </GridItem>
        <GridItem w="80%" marginBottom="30px">
          <Button
            colorScheme="brand"
            size="lg"
            w="100%"
            bg="brand.500"
            fontSize="22px"
          >
            Submit
          </Button>
        </GridItem>
      </SimpleGrid>
      <SimpleGrid
        borderTop="2px"
        h="30%"
        w="80%"
        maxW="60%"
        maxH="30%"
        columns={1}
        columnGap={3}
        rowGap={6}
        pos="relative"
        ml=" 20%"
        alignItems="center"
        justifyItems="center"
      >
        <Text
          pt="7px"
          pb="7px"
          pr="10px"
          pl="10px"
          border="1px"
          h="max-content"
          w="max-content"
          borderRadius="4px"
          pos="absolute"
          top="-20px"
          left={["39%", "45%", "45%", "45%", "45%", "45%"]}
          zIndex="3"
          bg="brand.100"
          color="black"
        >
          Or
        </Text>
        <Text mt="30px"> Sign in with: </Text>
        <HStack>
          <Flex
            h="60px"
            w="60px"
            bg="white"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            _hover={{ boxShadow: "xl" }}
          >
            <Image src={blueFacebook} h="40px" w="40px" />
          </Flex>
          <Flex
            h="60px"
            w="60px"
            bg="white"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            _hover={{ boxShadow: "xl" }}
          >
            <Image src={google} h="30px" w="30px" />
          </Flex>
          <Flex
            h="60px"
            w="60px"
            bg="white"
            borderRadius="50%"
            alignItems="center"
            justifyContent="center"
            pt="3px"
            pl="2px"
            _hover={{ boxShadow: "xl" }}
          >
            <Image src={blueTwitter} h="35px" w="35px" />
          </Flex>
        </HStack>
        <GridItem
          w="100%"
          h="max-content"
          marginBottom="30px"
          display="flex"
          justifyContent="center"
          textAlign={"center"}
          fontSize={["12px", "14px", "16px", "18px", "18px", "18px"]}
          margin={0}
        >
          <Text>Dont'have an account? </Text>
          <Text
            ml="5px"
            fontWeight="bold"
            _hover={{ color: "blue", textDecoration: "underline" }}
            onClick={signUpHandler}
          >
            Sign up
          </Text>
        </GridItem>
      </SimpleGrid>
    </div>
  );
};
export default LoginSide;
