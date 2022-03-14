import classes from "./shopMenu.module.css";
import { Container } from "@chakra-ui/react";
import { Grid, Button, SlideFade } from "@chakra-ui/react";
import { useSelector } from "react-redux";
const ShopMenu = () => {
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );

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
      <Button fontSize="20px" backgroundColor="inherit" textAlign="start">
        Swag
      </Button>
      <Button fontSize="20px" backgroundColor="inherit">
        Books
      </Button>
      <Button fontSize="20px" backgroundColor="inherit">
        Cart
      </Button>
      <Button fontSize="20px" backgroundColor="inherit">
        Checkout
      </Button>
    </Grid>
  );
};
export default ShopMenu;
