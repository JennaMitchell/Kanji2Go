import {
  Container,
  Flex,
  Image,
  Input,
  HStack,
  SimpleGrid,
  GridItem,
  Button,
  InputRightElement,
  InputGroup,
} from "@chakra-ui/react";
import logo from "../img/logo.JPG";
import {
  SearchIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import classes from "./navBar.module.css";

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
    <Container maxW="100%" maxH="100px" p="0" bgColor="#221f1f" m="0">
      <SimpleGrid
        columns={2}
        justifyContent="space-between"
        alignItems="center"
        w="100%"
        h="100%"
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
              ml={50}
            />
            <Flex w="max-content" h="60%" ml="10%">
              <HStack>
                <InputGroup>
                  <Input
                    placeholder="search for anything"
                    w="15vw"
                    color="white"
                    borderColor="white"
                  />
                  <InputRightElement
                    children={<SearchIcon className={classes.searchIcon} />}
                  />
                </InputGroup>
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
              >
                Home
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
              <Button
                w="80%"
                h="80%"
                fontSize="24px"
                onClick={shopButtonHandler}
                bgColor="inherit"
                _focus={{ border: "none" }}
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
              )}
            </Flex>

            <Flex
              mr="20px"
              justifyContent="center"
              alignItems="center"
              pos="relative"
            >
              <ShoppingCartIcon
                className={classes.shoppingCardIcon}
              ></ShoppingCartIcon>
              <Flex
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
                cd
                alignItems="center"
                fontSize="14px"
              >
                0
              </Flex>
            </Flex>

            <Button
              h="50px"
              w="170px"
              bgColor="brand.300"
              onClick={loginButtonHandler}
            >
              <UserIcon className={classes.userIcon} />
              Login/Register
            </Button>
          </Flex>
        </GridItem>
      </SimpleGrid>
    </Container>
  );
};
export default NavBar;
