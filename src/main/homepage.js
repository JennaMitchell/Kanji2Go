import {
  Container,
  VStack,
  Image,
  Text,
  SimpleGrid,
  GridItem,
  Button,
  Heading,
  Grid,
} from "@chakra-ui/react";
import cityStreetOne from "../img/city_street.jpg";
import cityStreetTwo from "../img/city_street2.jpg";
import kanjiSheet from "../img/kanji_Sheet.jpg";
import tablet from "../img/tablet.jpg";
import books from "../img/books.jpg";

import BannerBox from "../components/BannerBox";
import classes from "./homepage.module.css";

import { useSelector } from "react-redux";

import PageMenu from "./pageMenu";
import ShopMenu from "./shopMenu";
import LoginPopup from "../login/loginPopup";
import Footer from "../components/footer";
import NavBar from "../nav/navBar";
import { NavLink } from "react-router-dom";



const HomePage = () => {
  //const dispatch = useDispatch();
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);

  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  // const signUpButtonClicked = useSelector((state) => state.signUpButtonClicked);
  // const loginButtonHandler = () => {
  //   dispatch(storeActions.setLoginButtonClicked(true));
  //   dispatch(storeActions.setPageButtonClicked(false));
  //   dispatch(storeActions.setShopNavButtonClicked(false));
  // };
  return (
    <>
      {loginButtonClicked && <div className={classes.blurBackground}></div>}
      <div
        className={`${loginButtonClicked ? classes.loginClickedHomepage : ""}`}
      >
        <NavBar />
        <Container
          maxW="100%"
          h={["400px", "450px", "500px", "600px", "800px", "900px"]}
          p="0"
          bgColor="#dc5357"
          m="0"
          pos="relative"
        >
          {pageButtonClicked ? <PageMenu /> : ""}
          {shopNavButtonClicked ? <ShopMenu /> : ""}
          {loginButtonClicked ? <LoginPopup /> : ""}

          <SimpleGrid
            columns={2}
            alignItems="center"
            justifyItems="center"
            w="100%"
            h="100%"
          >
            <GridItem colSpan={1} h="max-content" w="75%" transform="auto">
              <Heading
                fontSize={{
                  base: "26px",
                  sm: "28px",
                  md: "50px",
                  lg: "60px",
                  xl: "80px",
                }}
                textAlign="center"
              >
                Custom Kanji Sheet Generator
              </Heading>
              <Text
                fontSize={{ base: "14px", sm: "18px", lg: "22px", xl: "36px" }}
                textAlign="left"
                mt="30px"
              >
                Create custom practice kanji practice material or use our
                premade ones with our kanji sheet generator.
              </Text>
              <Button
                h={["50px", "60px", "75px", "80px", "100px", "100px"]}
                w={["100%", "100%", "100%", "100%", "100%", "100%"]}
                mt="30px"
                fontSize={{ base: "20px", sm: "22px", lg: "30px", xl: "36px" }}
                bgColor="#221f1f"
                color="white"
                _hover={{ color: "black", bgColor: "brand.200" }}
              >
                <NavLink to="/customKanjiSheets" className={classes.navLink}>
                  Kanji Sheets
                </NavLink>
              </Button>
            </GridItem>

            <GridItem
              h="100%"
              w="100%"
              colSpan={1}
              display={"grid"}
              placeItems={"center"}
            >
              <Image
                src={kanjiSheet}
                alt="kanji sheets"
                h={["65%", "65%", "75%", "75%", "75%", "80%"]}
                w={["85%", "75%", "75%", "80%", "80%", "70%"]}
              ></Image>
            </GridItem>
          </SimpleGrid>
        </Container>
        <Container
          maxW="100%"
          w="100%"
          h={["650px", "750px", "750px", "750px", "750px", "800px"]}
          p="0"
          bgColor="brand.100"
          m="0"
          display={"grid"}
          alignItems={"center"}
          justifyContent={"center"}
          gridTemplateRows={"max-content auto"}
          gridTemplateColumns={[
            "100vw",
            "100vw",
            "100vw",
            "max-content",
            "max-content",
            "1600px",
          ]}
        >
          <VStack gap="15px">
            <Text color="brand.900" fontWeight="bold" mt="40px" fontSize="20px">
              EDUCATION ANYWHERE
            </Text>
            <Heading
              color="brand.900"
              w="100%"
              height="max-content"
              textAlign="center"
              fontSize={["22px", "24px", "26px", "28px", "28px", "28px"]}
            >
              Online Practice or Downloadable Sheets for Remote Learning
            </Heading>
            <Text
              color="brand.900"
              w="100%"
              height="max-content"
              textAlign="center"
              fontSize={["14px", "14px", "16px", "18px", "18px", "18px"]}
            >
              Find the latest, and most popular sheets below, or select custom
              practice sheets based on your JLPT Level.
            </Text>
          </VStack>

          <Grid
            w={"100%"}
            h="450px"
            bgColor="brand.100"
            alignContent="center"
            templateColumns={{
              base: "100%",
              sm: "100%",
              md: "100%",
              lg: "repeat(2,1fr)",
              xl: "repeat(3,1fr)",
            }}
            templateRows="100%"
            justifyItems="center"
            display={"grid"}
          >
            <NavLink to="/premadeKanjiSheets" className={classes.navLinkBox}>
              <BannerBox
                title="JLPT5"
                subtext="Kanji"
                img={cityStreetOne}
                ribbon={true}
              ></BannerBox>
            </NavLink>
            <Container
              h="max-content"
              w="max-content"
              display={{ base: "none", lg: "grid", xl: "grid" }}
            >
              <NavLink
                display={{ base: "none", lg: "grid", xl: "grid" }}
                to="/premadeKanjiSheets"
                className={classes.navLinkBox}
              >
                <BannerBox
                  title="JLPT5"
                  subtext="Vocab"
                  img={kanjiSheet}
                ></BannerBox>
              </NavLink>
            </Container>
            <Container
              h="max-content"
              w="max-content"
              display={{ base: "none", lg: "none", xl: "grid" }}
            >
              <NavLink to="/customKanjiSheets" className={classes.navLinkBox}>
                <BannerBox
                  title="Custom"
                  subtext="Kanji"
                  img={cityStreetTwo}
                ></BannerBox>
              </NavLink>
            </Container>
          </Grid>
        </Container>
        <Container
          maxW="100%"
          h={["400px", "500px", "600px", "700px", "800px", "900px"]}
          p="0"
          bgColor="brand.200"
          m="0"
          pos="relative"
        >
          <Grid
            templateColumns={"repeat(2,1fr)"}
            templateRows="100%"
            justifyItems="center"
            alignItems="center"
            maxW={["100%", "100%", "100%", "100%", "100%", "100%"]}
            h={"100%"}
          >
            <Image
              src={tablet}
              h={["50%", "50%", "60%", "60%", "70%", "70%"]}
              w={["90%", "80%", "70%", "70%", "70%", "70%"]}
              ml={["0", "10%", "10%", "10%", "10%", "10%"]}
              mt="0"
              alt="tablet"
              display={"grid"}
            />
            <GridItem
              w={["100%", "80%", "80%", "80%", "80%", "80%"]}
              h="max-content"
              p="10px"
              colSpan={1}
              display={{ base: "grid", lg: "grid", xl: "auto" }}
              alignItems={{ base: "center", lg: "center", xl: "auto" }}
              justifyItems={{ base: "center", lg: "center", xl: "auto" }}
              gap={["20px", "15px", "20px", "20px", "20px", "20px"]}
            >
              <Text
                fontSize={{
                  base: "16px",
                  sm: "18px",
                  md: "22px",
                  lg: "24px",
                  xl: "26px",
                }}
                color="black"
                textAlign={"center"}
              >
                Real Time Learning
              </Text>
              <Heading
                fontSize={{
                  base: "18px",
                  sm: "20px",
                  md: "32px",
                  lg: "40px",
                  xl: "70px",
                }}
                color="black"
                textAlign={"center"}
              >
                Practice Kanji Live. Immediate Feedback
              </Heading>
              <Text
                fontSize={{
                  base: "12px",
                  sm: "16px",
                  md: "18px",
                  lg: "20px",
                  xl: "26px",
                }}
                color="black"
                textAlign={"center"}
              >
                With Kanji2Go you can practice kanji live on the web and get
                automatic feedback. To busy? Try downloading our randomly
                generated kanji quiz sheet, based on kanji you want to practice.
              </Text>
              <Button
                bgColor="brand.600"
                mt={"10px"}
                h={["50px", "60px", "75px", "80px", "100px", "100px"]}
                w={["100%", "100%", "100%", "100%", "100%", "100%"]}
                fontSize={{ base: "14px", sm: "20px", lg: "30px", xl: "36px" }}
                textAlign="left"
                color="white"
                _hover={{ bgColor: "brand.100", color: "black" }}
              >
                <NavLink to="/kanjiQuiz" className={classes.navLink}>
                  View Live Test
                </NavLink>
              </Button>
            </GridItem>
          </Grid>
        </Container>

        <Grid
          maxW="100%"
          h={["400px", "500px", "600px", "700px", "800px", "900px"]}
          p="0"
          bgColor="#dc5357"
          m="0"
          templateColumns="repeat(2,1fr)"
          justifyItems="center"
          alignItems="center"
        >
          <GridItem
            w="80%"
            h={"max-content"}
            p="10px"
            colSpan={1}
            display="flex"
            flexDirection={"column"}
            alignItems={"flex-start"}
            justifyItems={"center"}
            gap="0"
          >
            <Text
              fontSize={{
                base: "14px",
                sm: "18px",
                md: "22px",
                lg: "26px",
                xl: "26px",
              }}
            >
              Get Started Today!
            </Text>
            <Heading
              fontSize={{
                base: "22px",
                sm: "24px",
                md: "30px",
                lg: "42px",
                xl: "80px",
              }}
              mt="10px"
            >
              Save Your Progress
            </Heading>
            <Text
              fontSize={{ base: "12px", md: "20px", lg: "26px", xl: "26px" }}
              mt="20px"
            >
              Create a free account today to save your custom made sheets, and
              track your quiz progress.
            </Text>
            <Text
              bgColor="inherit"
              mt="2%"
              h={["50px", "60px", "75px", "80px", "100px", "100px"]}
              w={["100%", "100%", "100%", "100%", "100%", "100%"]}
              fontSize={{ base: "18px", sm: "26px", lg: "30px", xl: "36px" }}
              textAlign="left"
              marginTop="20px"
              color="brand.900"
              display={"grid"}
              alignItems="center"
              justifyContent={"flex-start"}
              // _hover={{ bgColor: "brand.100", color: "black" }}
            >
              Coming Soon...
            </Text>
          </GridItem>
          <Image
            src={books}
            h={["50%", "60%", "60%", "60%", "60%", "70%"]}
            w={["90%", "80%", "80%", "70%", "70%", "70%"]}
            mt="0"
            alt="tablet"
          />
        </Grid>
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
