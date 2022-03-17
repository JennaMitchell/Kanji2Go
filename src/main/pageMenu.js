import classes from "./pageMenu.module.css";
import { Grid, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
const PageMenu = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const dispatch = useDispatch();
  const navButtonHandler = () => {
    dispatch(storeActions.setShopNavButtonClicked(false));
    dispatch(storeActions.setPageButtonClicked(false));
  };

  return (
    <Grid
      h="max-content"
      w="max-content"
      bgColor="brand.900"
      borderTop="2px"
      borderTopColor="brand.600"
      pos="absolute"
      top="0"
      right="14.5%"
      p={4}
      borderEndEndRadius="20px"
      borderEndStartRadius="20px"
      zIndex={10}
    >
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        textAlign="start"
        onClick={navButtonHandler}
      >
        <NavLink to="/aboutus"> About Us</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        <NavLink to="/premadeKanjiSheets">Premade Kanji Sheets</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Kanji Sheets Creator
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Kanji Test
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Tutorials
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Contact Us
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Privacy Policy
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Terms of Service
      </Button>
    </Grid>
  );
};
export default PageMenu;
