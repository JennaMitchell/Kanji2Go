import classes from "./aboutUsPage.module.css";
import {
  Container,
  VStack,
  Image,
  Text,
  SimpleGrid,
  GridItem,
  Heading,
} from "@chakra-ui/react";

import Footer from "../components/footer";

import { useSelector } from "react-redux";

import PageMenu from "../main/pageMenu";
import ShopMenu from "../main/shopMenu";
import LoginPopup from "../login/loginPopup";

import codingPhoto from "../img/coding.jpg";
import NavBar from "../nav/navBar";

const AboutUsPage = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);

  return (
    <div className={`${loginButtonClicked ? classes.loginClickedHompage : ""}`}>
      <NavBar />
      <Container
        maxW="100%"
        h="150px"
        p="0"
        bgColor="#dc5357"
        m="0"
        pos="relative"
        display="grid"
        placeItems="center"
      >
        {pageButtonClicked ? <PageMenu /> : ""}
        {shopNavButtonClicked ? <ShopMenu /> : ""}
        {loginButtonClicked ? <LoginPopup /> : ""}

        <Heading
          w="max-content"
          textAlign="center"
          h="max-content"
          fontSize="64px"
          color="brand.900"
          borderBottom="2px"
        >
          About Us
        </Heading>
      </Container>
      <Container maxW="100%" h="900px" p="0" bgColor="brand.200" m="0">
        <SimpleGrid
          columns={2}
          w="100%"
          h="100%"
          display="grid"
          placeItems="center"
        >
          <GridItem w="650px" h="max-content">
            <VStack w="fill" h="fill">
              <Heading
                color="brand.900"
                fontSize="64px"
                borderBottom="2px"
                textAlign="center"
                w="100%"
              >
                Passion Driven
              </Heading>
              <Text fontSize="26px" paddingTop="30px" color="brand.900">
                Kanji2Go is created by Jenna Mitchell, an aspiring frontend
                devloper. Who's love for language learning, inspired her to
                create a free, dynamic, language web app to aid others on their
                journey to mastering Japanense.
              </Text>
            </VStack>
          </GridItem>
          <GridItem
            w="650px"
            h="650px"
            bgColor="brand.600"
            display="grid"
            placeItems="center"
            colSpan={1}
            borderRadius="10px"
          >
            <Image
              src={codingPhoto}
              h="90%"
              w="90%"
              borderRadius="10px"
            ></Image>
          </GridItem>
        </SimpleGrid>
      </Container>
      <Footer />
    </div>
  );
};

export default AboutUsPage;
