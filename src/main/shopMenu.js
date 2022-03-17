import classes from "./shopMenu.module.css";
import { Container } from "@chakra-ui/react";
import { Grid, Button, SlideFade } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";
const ShopMenu = () => {
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
      right="11.5%"
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
        Swag
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Books
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Cart
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
      >
        Checkout
      </Button>
    </Grid>
  );
};
export default ShopMenu;
