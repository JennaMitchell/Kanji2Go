import classes from "./pageMenu.module.css";
import { Grid, Button, SlideFade } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const PageMenu = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);

  return (
    <SlideFade offsetY="-30px" in={pageButtonClicked}>
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
      >
        <Button fontSize="20px" backgroundColor="inherit" textAlign="start">
          About Us
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Premade Kanji Sheets
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Kanji Sheets Creator
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Kanji Test
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Tutorials
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Contact Us
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Privacy Policy
        </Button>
        <Button fontSize="20px" backgroundColor="inherit">
          Terms of Service
        </Button>
      </Grid>
    </SlideFade>
  );
};
export default PageMenu;
