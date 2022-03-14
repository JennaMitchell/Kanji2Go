import classes from "./footer.module.css";
import {
  Container,
  VStack,
  Image,
  HStack,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Heading,
  Grid,
} from "@chakra-ui/react";

import facebookIcon from "../icons/facebook-app-symbol.png";
import instagramIcon from "../icons/instagram.png";
import linkedinIcon from "../icons/linkedin.png";
import twitterIcon from "../icons/twitter.png";

import {
  LocationMarkerIcon,
  PhoneIcon,
  MailIcon,
} from "@heroicons/react/solid";
const Footer = () => {
  return (
    <Grid
      maxW="100%"
      h="max-content"
      p="0"
      bgColor="#221f1f"
      m="0"
      templateColumns="1fr 4fr"
      alignItems="center"
      justifyItems="center"
      paddingBottom="80px"
      paddingTop="40px"
    >
      <GridItem
        h="max-content"
        w="80%"
        display="flex"
        flexDirection="column"
        colSpan={1}
        alignItems="center"
        justifyItems="center"
      >
        <Heading p="30px" w="100%" textAlign="start">
          Kanji2Go
        </Heading>
        <Text p="30px">
          Working to bring free education by providing adaptive learning,
          student engagment, and a flexible study environment.
        </Text>
        <HStack alignItems="center" justifyItems="end" w="max-content" mr="57%">
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
        templateColumns="repeat(3,1fr)"
        alignItems="center"
        justifyItems="center"
        colSpan={1}
        w="100%"
        h="max-content"
      >
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading marginBottom="30px">Explore</Heading>
          <Text fontSize="24px">Home</Text>
          <Text fontSize="24px">About</Text>
          <Text fontSize="24px">Contact</Text>
        </VStack>
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading marginBottom="30px">Resources</Heading>
          <Text fontSize="24px">What is JLPT?</Text>
          <Text fontSize="24px">JLPT Testing Centers</Text>
          <Text fontSize="24px">Create Account</Text>
        </VStack>
        <VStack w="100%" h="100%" colSpan={1}>
          <Heading marginBottom="30px">Contact</Heading>
          <HStack>
            <LocationMarkerIcon className={classes.icon} />
            <Text fontSize="24px">Address</Text>
          </HStack>
          <HStack>
            <PhoneIcon className={classes.icon} />
            <Text fontSize="24px">Phone</Text>
          </HStack>
          <HStack>
            <MailIcon className={classes.icon} />
            <Text fontSize="24px">Email</Text>
          </HStack>
        </VStack>
      </Grid>
    </Grid>
  );
};

export default Footer;
