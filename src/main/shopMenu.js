import { Grid, Button } from "@chakra-ui/react";

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
      border="2px"
      borderTop="0px"
      borderTopColor="brand.100"
      pos="absolute"
      top="0"
      right="11.5%"
      p={4}
      borderEndEndRadius="20px"
      borderEndStartRadius="20px"
      zIndex={10}
      color="white"
    >
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        textAlign="start"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Swag
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Books
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Cart
      </Button>
      <Button
        fontSize="20px"
        backgroundColor="inherit"
        onClick={navButtonHandler}
        _hover={{ color: "black", bgColor: "brand.300" }}
      >
        Checkout
      </Button>
    </Grid>
  );
};
export default ShopMenu;
