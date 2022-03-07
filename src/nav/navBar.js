import {
  Container,
  Flex,
  Image,
  Input,
  HStack,
  Text,
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
  UserIcon,
  ShoppingCartIcon,
} from "@heroicons/react/solid";
import classes from "./navBar.module.css";

const NavBar = () => {
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
              <Text w="80%" h="80%" fontSize="24px">
                Home
              </Text>
              <ChevronDownIcon
                className={classes.chevronDownIcon}
              ></ChevronDownIcon>
            </Flex>

            <Flex mr="20px" justifyContent="center" alignItems="center">
              <Text w="80%" h="80%" fontSize="24px">
                Pages
              </Text>
              <ChevronDownIcon
                className={classes.chevronDownIcon}
              ></ChevronDownIcon>
            </Flex>
            <Flex mr="20px" justifyContent="center" alignItems="center">
              <Text w="80%" h="80%" fontSize="24px">
                Shop
              </Text>
              <ChevronDownIcon
                className={classes.chevronDownIcon}
              ></ChevronDownIcon>
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
                alignItems="center"
                fontSize="14px"
              >
                0
              </Flex>
            </Flex>

            <Button h="50px" w="170px" bgColor="brand.300">
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
