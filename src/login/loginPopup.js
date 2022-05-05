import { Fade } from "@chakra-ui/react";

import { useSelector } from "react-redux";

import LoginSide from "./loginSide";
import SignUpSide from "./signUpSide";
import classes from "./loginPopup.module.css";

const LoginPopup = () => {
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const signUpButtonClicked = useSelector((state) => state.signUpButtonClicked);

  return (
    <Fade in={loginButtonClicked}>
      <div className={classes.blurBackground}>
        {signUpButtonClicked ? <SignUpSide /> : <LoginSide />}
      </div>
    </Fade>
  );
};
export default LoginPopup;
