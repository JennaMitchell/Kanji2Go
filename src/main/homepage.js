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
import cityStreetOne from "../img/city_street.jpg";
import cityStreetTwo from "../img/city_street2.jpg";
import kanjiSheet from "../img/kanji_Sheet.jpg";
import tablet from "../img/tablet.jpg";
import books from "../img/books.jpg";
import facebookIcon from "../icons/facebook-app-symbol.png";
import instagramIcon from "../icons/instagram.png";
import linkedinIcon from "../icons/linkedin.png";
import twitterIcon from "../icons/twitter.png";

import BannerBox from "../components/BannerBox";
import classes from "./homepage.module.css";
import {
  LocationMarkerIcon,
  PhoneIcon,
  MailIcon,
} from "@heroicons/react/solid";
import { useSelector } from "react-redux";

import PageMenu from "./pageMenu";
import ShopMenu from "./shopMenu";
import LoginPopup from "../login/loginPopup";
import Footer from "../components/footer";
import NavBar from "../nav/navBar";

const HomePage = () => {
  //const dispatch = useDispatch();
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const signUpButtonClicked = useSelector((state) => state.signUpButtonClicked);
  return (
    <>
      {loginButtonClicked && <div className={classes.blurBackground}></div>}
      <div
        className={`${loginButtonClicked ? classes.loginClickedHomepage : ""}`}
      >
        <NavBar />
        <Container
          maxW="100%"
          h="900px"
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
              <Heading fontSize="80px" textAlign="center">
                Custom Kanji Sheet Generator
              </Heading>
              <Text fontSize="36px" textAlign="left" mt="30px">
                Create custom practice kanji practice material or use our
                premade ones with our kanji sheet generator.
              </Text>
              <Button
                h="100px"
                w="100%"
                mt="30px"
                fontSize="36px"
                bgColor="#221f1f"
              >
                Kanji Sheets
              </Button>
            </GridItem>

            <GridItem h="max-content" w="max-content" colSpan={1}>
              <Image
                src={kanjiSheet}
                alt="kanji sheets"
                h="800px"
                w="800px"
              ></Image>
            </GridItem>
          </SimpleGrid>
        </Container>
        <Container maxW="100%" h="900px" p="0" bgColor="brand.100" m="0">
          <VStack gap="15px">
            <Text color="brand.900" fontWeight="bold" mt="40px" fontSize="20px">
              EDUCATION ANYWHERE
            </Text>
            <Heading color="brand.900" maxW="600px" textAlign="center">
              Online Practice or Downloadable Sheets for Remote Learning
            </Heading>
            <Text
              color="brand.900"
              maxW="600px"
              textAlign="center"
              fontSize="18px"
            >
              Find the latest, and most popular sheets below, or select custom
              practice sheets based on your JLPT Level.
            </Text>
          </VStack>

          <Grid
            w="100%"
            h="400px"
            bgColor="brand.100"
            alignItems="center"
            templateColumns="repeat(3,1fr)"
            justifyContent="center"
            mt="3%"
          >
            <BannerBox
              title="JLPT5"
              subtext="Kanji"
              img={cityStreetOne}
              marginLeft="40%"
              ribbon={true}
            ></BannerBox>
            <BannerBox
              title="Custom"
              subtext="Kanji"
              img={kanjiSheet}
              marginLeft="30%"
            ></BannerBox>

            <BannerBox
              title="Custom"
              subtext="Vocab"
              img={cityStreetTwo}
              marginLeft="20%"
            ></BannerBox>
          </Grid>
        </Container>
        <Container
          maxW="100%"
          h="900px"
          p="0"
          bgColor="brand.200"
          m="0"
          pos="relative"
        >
          <Grid
            templateColumns="repeat(2,1fr)"
            templateRows="100%"
            justifyContent="center"
            alignItems="center"
            maxW="100%"
            h="900px"
          >
            <Image src={tablet} h="70%" w="70%" ml="10%" mt="0" alt="tablet" />
            <GridItem w="80%" h="50%" p="10px" colSpan={1} ml="10%">
              <Text fontSize="26px" color="black">
                Real Time Learning
              </Text>
              <Heading fontSize="80px" color="black">
                Practice Kanji Live. Immediate Feedback
              </Heading>
              <Text fontSize="26px" color="black">
                With Kanji2Go you can practice kanji live on the web and get
                automatic feedback. To busy? Try downloading our randomly
                generated kanji quiz sheet, based on kanji you want to practice.
              </Text>
              <Button
                bgColor="brand.700"
                mt="2%"
                w="30%"
                height="15%"
                fontSize="22px"
                textAlign="left"
              >
                View Live Test
              </Button>
            </GridItem>
          </Grid>
        </Container>

        <Grid
          maxW="100%"
          h="900px"
          p="0"
          bgColor="#dc5357"
          m="0"
          templateColumns="repeat(2,1fr)"
          justifyContent="center"
          alignItems="center"
        >
          <GridItem w="80%" h="50%" p="10px" colSpan={1} ml="10%" mt="10%">
            <Text fontSize="26px">Get Started Today!</Text>
            <Heading fontSize="80px" mt="10px">
              Save Your Progress
            </Heading>
            <Text fontSize="26px" mt="20px">
              Create a free account today to save your custom made sheets, and
              track your quiz progress.
            </Text>
            <Button
              bgColor="brand.700"
              mt="2%"
              w="30%"
              height="15%"
              fontSize="22px"
              textAlign="left"
              marginTop="20px"
            >
              Register
            </Button>
          </GridItem>
          <Image src={books} h="70%" w="70%" ml="10%" mt="0" alt="tablet" />
        </Grid>
        <Footer />
      </div>
    </>
  );
};
export default HomePage;
