import {
  Container,
  Input,
  SimpleGrid,
  GridItem,
  Heading,
  FormControl,
  FormLabel,
  Text,
  Button,
} from "@chakra-ui/react";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import classes from "./signUpSide.module.css";

import { storeActions } from "../store/store";

const SignUpSide = () => {
  const dispatch = useDispatch();
  const closingIconHandler = () => {
    dispatch(storeActions.setLoginButtonClicked(false));
  };
  const signUpHandler = () => {
    dispatch(storeActions.setSignUpButtonClicked(false));
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
        mt={["6%", "4%", "4%", "4%", "4%", "4%"]}
        ml="5%"
        justifyItems="center"
        alignItems="center"
      >
        <GridItem colSpan={1}>
          <Heading
            textAlign="center"
            fontSize={["24px", "28px", "46px", "46px", "46px", "46px"]}
          >
            Let's Get Started!
          </Heading>
          <Text
            fontSize={["14px", "16px", "18px", "18px", "18px", "18px"]}
            mt="10px"
          >
            Create an account to save your progress
          </Text>
        </GridItem>
        <GridItem colSpan={1} w="80%">
          <FormControl>
            <FormLabel fontSize="20px">Username</FormLabel>
            <Input
              placeholder="username"
              _placeholder={{ color: "black" }}
              bg="white"
              h="40px"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1} w="80%">
          <FormControl>
            <FormLabel fontSize="20px">Email</FormLabel>
            <Input
              placeholder="email"
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
              placeholder="password"
              _placeholder={{ color: "black" }}
              bg="white"
              h="40px"
            />
          </FormControl>
        </GridItem>
        <GridItem colSpan={1} w="80%">
          <FormControl>
            <FormLabel fontSize="20px">Confirm Password</FormLabel>
            <Input
              placeholder="confirm password"
              _placeholder={{ color: "black" }}
              bg="white"
              h="40px"
            />
          </FormControl>
        </GridItem>
        <GridItem
          w="80%"
          marginBottom={["0px", "10px", "20px", "20px", "20px", "20px"]}
        >
          <Button
            colorScheme="brand"
            size="lg"
            w="100%"
            bg="brand.300"
            fontSize="22px"
          >
            Submit
          </Button>
        </GridItem>
        <Container
          w="100%"
          h="max-content"
          display="flex"
          justifyContent="center"
          textAlign={"center"}
          fontSize={["12px", "14px", "16px", "18px", "18px", "18px"]}
        >
          <Text>Already have an account? </Text>
          <Text
            ml="5px"
            fontWeight="bold"
            _hover={{ color: "blue", textDecoration: "underline" }}
            onClick={signUpHandler}
          >
            Sign in
          </Text>
        </Container>
      </SimpleGrid>
    </div>
  );
};
export default SignUpSide;
