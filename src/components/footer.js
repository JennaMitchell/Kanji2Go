import classes from "./footer.module.css";
import {
  Link,
  VStack,
  Image,
  HStack,
  Text,
  GridItem,
  Button,
  Heading,
  Grid,
} from "@chakra-ui/react";

import facebookIcon from "../icons/facebook-app-symbol.png";
import instagramIcon from "../icons/instagram.png";
import linkedinIcon from "../icons/linkedin.png";
import twitterIcon from "../icons/twitter.png";
import { NavLink } from "react-router-dom";
import { useDispatch } from "react-redux";
import { storeActions } from "../store/store";

import {
  LocationMarkerIcon,
  PhoneIcon,
  MailIcon,
} from "@heroicons/react/solid";
const Footer = () => {
  const dispatch = useDispatch();
  const loginButtonHandler = () => {
    dispatch(storeActions.setLoginButtonClicked(true));
    dispatch(storeActions.setPageButtonClicked(false));
    dispatch(storeActions.setShopNavButtonClicked(false));
  };

  return (
    <Grid
      maxW="100%"
      w="100%"
      h="max-content"
      p="0"
      bgColor="#221f1f"
      m="0"
      templateColumns={{ sm: "100%", lg: "1fr 3fr" }}
      alignItems="center"
      justifyItems="center"
      paddingBottom="80px"
      paddingTop="40px"
      color="white"
    >
      <GridItem
        h="max-content"
        w="80%"
        display="flex"
        flexDirection="column"
        colSpan={1}
        alignContent="flex-start"
        justifyItems="center"
      >
        <Heading
          w="80%"
          height="max-content"
          fontSize={{ base: "22px", sm: "28px", md: "32px" }}
          lineHeight={{ base: "22px", sm: "28px", md: "32px" }}
          textAlign="flex-start"
        >
          Kanji2Go
        </Heading>
        <Text paddingTop="30px" paddingBottom="30px">
          Working to bring free education by providing adaptive learning,
          student engagment, and a flexible study environment.
        </Text>
        <HStack alignSelf="center" justifySelf="flex-start" w="100%">
          <Image
            src={facebookIcon}
            w="20px"
            h="20px"
            borderRadius="2px"
            bg="white"
            padding="1px"
          />
          <Image
            src={instagramIcon}
            bg="white"
            w="20px"
            h="20px"
            borderRadius="2px"
            padding="1px"
          />
          <Image
            src={twitterIcon}
            bg="white"
            w="20px"
            h="20px"
            borderRadius="2px"
            padding="1px"
          />
          <Image
            src={linkedinIcon}
            bg="white"
            w="20px"
            h="20px"
            borderRadius="2px"
            padding="1px"
          />
        </HStack>
      </GridItem>
      <Grid
        templateColumns={{ base: "100%", sm: " 100%", lg: "repeat(3,1fr)" }}
        alignItems="center"
        justifyItems="center"
        colSpan={1}
        w="100%"
        h="max-content"
        mt={{ base: "20px", sm: "20px", lg: "0" }}
        margin={0}
      >
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading
            marginTop={{ base: "30px", sm: "30px", lg: "30px" }}
            marginBottom={{ sm: "0", lg: "30px" }}
            fontSize={{ base: "34px", sm: "34px", md: "28px" }}
          >
            Explore
          </Heading>
          <Button
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            bgColor={"brand.900"}
            _hover={{ bgColor: "brand.500", color: "black" }}
          >
            <NavLink to="/home">Home</NavLink>
          </Button>
          <Button
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            bgColor={"brand.900"}
            _hover={{ bgColor: "brand.500", color: "black" }}
          >
            <NavLink to="/aboutus"> About Us</NavLink>
          </Button>
          <Button
            bgColor={"brand.900"}
            _hover={{ bgColor: "brand.500", color: "black" }}
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
          >
            <NavLink to="/premadeKanjiSheets">Premade Kanji Sheets</NavLink>
          </Button>
        </VStack>
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading
            marginTop={{ base: "20px", sm: "30px", lg: "30px" }}
            marginBottom={{ sm: "0", lg: "30px" }}
            fontSize={{ base: "34px", sm: "34px", md: "28px" }}
          >
            Resources
          </Heading>
          <Button
            paddingLeft={"10px"}
            paddingRight={"10px"}
            paddingBottom={"2.5px"}
            paddingTop={"2.5px"}
            borderRadius={"5px"}
            bgColor={"brand.900"}
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            _hover={{
              bgColor: "brand.500",
              color: "black",
            }}
            textDecoration="none"
          >
            <Link
              href="https://www.jlpt.jp/e/about/index.html"
              isExternal
              _hover={{
                textDecoration: "none",
              }}
            >
              What is JLPT?
            </Link>
          </Button>
          <Button
            paddingLeft={"10px"}
            paddingRight={"10px"}
            paddingBottom={"2.5px"}
            paddingTop={"2.5px"}
            borderRadius={"5px"}
            bgColor={"brand.900"}
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            _hover={{
              bgColor: "brand.500",
              color: "black",
              textDecoration: "none",
            }}
            textDecoration="none"
          >
            <Link
              href="https://www.jlpt.jp/e/application/domestic_index.html"
              isExternal
              _hover={{
                textDecoration: "none",
              }}
            >
              JLPT Testing Centers
            </Link>
          </Button>
          <Button
            bgColor={"brand.900"}
            _hover={{ bgColor: "brand.500", color: "black" }}
            fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            onClick={loginButtonHandler}
            target={""}
          >
            <NavLink to="/customKanjiSheets">Kanji Sheets Creator</NavLink>
          </Button>
        </VStack>
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading
            marginTop={{ base: "20px", sm: "30px", lg: "30px" }}
            marginBottom={{ sm: "0", lg: "30px" }}
            fontSize={{ base: "34px", sm: "34px", md: "28px" }}
          >
            Contact
          </Heading>
          <HStack>
            <LocationMarkerIcon className={classes.icon} />
            <Text
              fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            >
              Address
            </Text>
          </HStack>
          <HStack>
            <PhoneIcon className={classes.icon} />
            <Text
              fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            >
              Phone
            </Text>
          </HStack>
          <HStack>
            <MailIcon className={classes.icon} />
            <Text
              fontSize={{ base: "16px", sm: "20px", md: "22px", lg: "24px" }}
            >
              Email
            </Text>
          </HStack>
        </VStack>
      </Grid>
    </Grid>
  );
};

export default Footer;
