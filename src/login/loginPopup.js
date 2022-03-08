import {
  Container,
  Flex,
  Image,
  Input,
  HStack,
  SimpleGrid,
  GridItem,
  Button,
  InputRightElement,
  InputGroup,
  Fade,
  Heading,
} from "@chakra-ui/react";
import { useSelector } from "react-redux";

const LoginPopup = () => {
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  return (
    <Fade in={loginButtonClicked}>
      <Container maxW="100vw" h="100vh" bgColor="rgba(0, 0, 0, 0.8)" zIndex={2}>
        <Container
          zIndex={3}
          maxW="30vw"
          h="60vh"
          pos="fixed"
          top="20%"
          left="35%"
          bg="brand.100"
          translate="yes"
          translateX="-50%"
          translateY="50%"
          borderRadius="40px"
        >
          <Heading>Login</Heading>
        </Container>
      </Container>
    </Fade>
  );
};
export default LoginPopup;
