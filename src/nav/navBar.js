import { Flex, Image, SimpleGrid, GridItem, Button } from "@chakra-ui/react";
import logo from "../img/logo2.jpg";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/solid";
import classes from "./navBar.module.css";
import { NavLink } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../store/store";

const NavBar = () => {
  //const pageButtonClicked = useSelector((state) => state.pageButtonClicked);

  const dispatch = useDispatch();
  //useEffect(() => {}, [pageButtonClicked]);
  const storePageButtonClicked = useSelector(
    (state) => state.pageButtonClicked
  );
  const storeShopButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );

  const pageButtonHandler = () => {
    if (storePageButtonClicked) {
      dispatch(storeActions.setPageButtonClicked(false));
    } else {
      if (storeShopButtonClicked) {
        dispatch(storeActions.setShopNavButtonClicked(false));
      }
      dispatch(storeActions.setPageButtonClicked(true));
      // if the shop button is clicked then we turn it off and render the page button
    }
  };

  return (
    <>
      <div className={classes.mainContainer}>
        <SimpleGrid
          columns={2}
          justifyContent="space-between"
          alignItems="center"
          w="100%"
          h="100%"
          position="relative"
        >
          <GridItem colSpan={1} maxW="100%" height="100px">
            <Flex
              justifyContent="center"
              alignItems="center"
              maxW="max-content"
              height="100px"
            >
              <Image
                src={logo}
                alt="kanji 2 go logo"
                maxW={["45px", "60px", "60px", "60px", "60px", "60px"]}
                maxH={["45px", "60px", "60px", "60px", "60px", "60px"]}
                borderRadius="50%"
                border="none"
                ml={["10px", "20px", "40px", "30px", "30px", "30px"]}
              />
            </Flex>
          </GridItem>
          <GridItem
            colSpan={1}
            w="100%"
            h="100%"
            justifyContent="flex-end"
            display="flex"
            alignItems="center"
          >
            <Flex mr={[3, 3, 30, 30, 50, 50]}>
              <Flex
                mr={["0px", "20px", "20px", "20px", "20px", "20px"]}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  w={["70%", "100%", "100%", "100%", "100%", "100%"]}
                  h="40px"
                  fontSize={["16px", "20px", "24px", "24px", "24px", "24px"]}
                  bg="inherit"
                  _hover={{ color: "black", bgColor: "brand.300" }}
                >
                  <NavLink to="/home">Home</NavLink>
                </Button>
              </Flex>

              <Flex
                justifyContent="center"
                alignItems="center "
                mr={["2px", "30px", "30px", "30px", "30px", "30px"]}
              >
                <Button
                  w={["60%", "100%", "100%", "100%", "100%", "100%"]}
                  h="40px"
                  fontSize={["16px", "20px", "24px", "24px", "24px", "24px"]}
                  onClick={pageButtonHandler}
                  bgColor="inherit"
                  _focus={{ border: "none" }}
                  _hover={{ color: "black", bgColor: "brand.300" }}
                >
                  Pages
                </Button>
                {storePageButtonClicked ? (
                  <ChevronUpIcon
                    className={classes.chevronDownIcon}
                  ></ChevronUpIcon>
                ) : (
                  <ChevronDownIcon
                    className={classes.chevronDownIcon}
                  ></ChevronDownIcon>
                )}
              </Flex>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </div>
    </>
  );
};
export default NavBar;
