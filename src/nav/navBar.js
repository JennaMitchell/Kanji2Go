import {
  Flex,
  Image,
  HStack,
  SimpleGrid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import logo from "../img/logo.jpg";
import {
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
} from "@heroicons/react/solid";
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
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const customAddComponentClicked = useSelector(
    (state) => state.customAddComponentClicked
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
  const shopButtonHandler = () => {
    if (storeShopButtonClicked) {
      dispatch(storeActions.setShopNavButtonClicked(false));
    } else {
      if (storePageButtonClicked) {
        dispatch(storeActions.setPageButtonClicked(false));
      }
      // if the page button is clicked then we turn it off and render the shop button
      dispatch(storeActions.setShopNavButtonClicked(true));
    }
  };
  const loginButtonHandler = () => {
    dispatch(storeActions.setLoginButtonClicked(true));
    dispatch(storeActions.setPageButtonClicked(false));
    dispatch(storeActions.setShopNavButtonClicked(false));
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
                maxW="60px"
                maxH="60px"
                borderRadius="50%"
                border="none"
                ml={["30px", "40px", "40px", "50px", "50px", "50px"]}
              />
              <Flex w="max-content" h="60%" ml="10%">
                <HStack>
                  {/* <InputGroup>
                    <Input
                      placeholder="search for anything"
                      w="15vw"
                      color="white"
                      borderColor="white"
                      _placeholder={{ color: "white" }}
                    />
                    <InputRightElement
                      children={<SearchIcon className={classes.searchIcon} />}
                    />
                  </InputGroup> */}
                </HStack>
              </Flex>
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
            <Flex mr={50}>
              <Flex mr="20px" justifyContent="center" alignItems="center">
                <Button
                  w="100%"
                  h="80%"
                  fontSize="24px"
                  paddingRight="10px"
                  bg="inherit"
                  _hover={{ color: "black", bgColor: "brand.300" }}
                >
                  <NavLink to="/home">Home</NavLink>
                </Button>
              </Flex>

              <Flex mr="20px" justifyContent="center" alignItems="center">
                <Button
                  w="80%"
                  h="80%"
                  fontSize="24px"
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
              <Flex mr="20px" justifyContent="center" alignItems="center">
                {/* <Button
                  w="80%"
                  h="80%"
                  fontSize="24px"
                  onClick={shopButtonHandler}
                  bgColor="inherit"
                  _focus={{ border: "none" }}
                  _hover={{ color: "black", bgColor: "brand.300" }}
                >
                  Shop
                </Button>
                {storeShopButtonClicked ? (
                  <ChevronUpIcon
                    className={classes.chevronDownIcon}
                  ></ChevronUpIcon>
                ) : (
                  <ChevronDownIcon
                    className={classes.chevronDownIcon}
                  ></ChevronDownIcon>
                )} */}
              </Flex>

              {/* <Flex
                mr="20px"
                justifyContent="center"
                alignItems="center"
                pos="relative"
              > */}
              {/* <ShoppingCartIcon
                  className={classes.shoppingCardIcon}
                ></ShoppingCartIcon> */}
              {/* <Flex
                  pos="absolute"
                  bgColor="brand.300"
                  h="17.5px"
                  w="17.5px"
                  p="0"
                  borderRadius="7px"
                  textAlign="center"
                  top="4px"
                  right="-5px"
                  justifyContent="center"
                  alignItems="center"
                  fontSize="14px"
                >
                  0
                </Flex>
              </Flex> */}

              <Button
                h="50px"
                w={["140px", "140px", "170px", "170px", "170px", "170px"]}
                bgColor="brand.300"
                onClick={loginButtonHandler}
                _hover={{ color: "black", bgColor: "brand.300" }}
              >
                <UserIcon className={classes.userIcon} />
                Login/Register
              </Button>
            </Flex>
          </GridItem>
        </SimpleGrid>
      </div>
    </>
  );
};
export default NavBar;
