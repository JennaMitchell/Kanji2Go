import { Container, Fade } from "@chakra-ui/react";

import { useDispatch, useSelector } from "react-redux";

import LoginSide from "./loginSide";
import SignUpSide from "./signUpSide";

const LoginPopup = () => {
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const signUpButtonClicked = useSelector((state) => state.signUpButtonClicked);

  return (
    <Fade in={loginButtonClicked}>
      <Container maxW="100vw" h="100vh" bgColor="rgba(0, 0, 0, 0.8)" zIndex={2}>
        {signUpButtonClicked ? <SignUpSide /> : <LoginSide />}
      </Container>
    </Fade>
  );
};
export default LoginPopup;
