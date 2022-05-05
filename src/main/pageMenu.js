import { Grid, Button } from "@chakra-ui/react";

import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
const PageMenu = () => {
  // const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
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
      border="2px"
      borderColor="brand.100"
      pos="absolute"
      top="0"
      right={["175px", "175px", "200px", "200px", "200px", "200px"]}
      p={4}
      borderEndEndRadius="20px"
      borderEndStartRadius="20px"
      zIndex={10}
      color="white"
      borderTop="0px"
    >
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        textAlign="start"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        <NavLink to="/aboutus"> About Us</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        <NavLink to="/premadeKanjiSheets">Premade Kanji Sheets</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        <NavLink to="/customKanjiSheets">Kanji Sheets Creator</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        <NavLink to="/kanjiQuiz">Kanji Quiz</NavLink>
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        <NavLink to="/sentencePractice">Sentence Practice</NavLink>
      </Button>

      {/* <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Privacy Policy
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Terms of Service
      </Button> */}
    </Grid>
  );
};
export default PageMenu;
