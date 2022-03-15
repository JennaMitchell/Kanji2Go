import classes from "./premadeKanjiSheets.module.css";
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

import Footer from "../../components/footer";

import { useSelector } from "react-redux";

import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import { MenuIcon } from "@heroicons/react/solid";
import PremadeKanjiCard from "./premadeKanjiCard";
import MountainStart from "../../img/mountainStart.jpg";
import Gate from "../../img/gate.jpg";

import SunsetCity from "../../img/sunset.jpg";

const PreMadeKanjiSheets = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  const vocabCardsDB = useSelector((state) => state.vocabCardsDB);
  const grammarCardsDB = useSelector((state) => state.grammarCardsDB);

  return (
    <div className={`${loginButtonClicked ? classes.loginClickedHompage : ""}`}>
      <Container
        maxW="100%"
        h="150px"
        p="0"
        bgColor="#dc5357"
        m="0"
        pos="relative"
        display="flex"
        justifyContent="center"
        alignItems="center"
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
          Premade Kanji Sheets
        </Heading>
      </Container>
      <div className={classes.cardGrid}>
        <Container
          pos="absolute"
          w="50px"
          h="50px"
          bgColor="#dc5357"
          p="0"
          top="5%"
          left="0%"
          display="grid"
          placeItems="center"
        >
          <MenuIcon className={classes.menuIcon} />
        </Container>
        {kanjiCardsDB.length !== 0 &&
          kanjiCardsDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={MountainStart}
              title={card.title}
              description={card.description}
              bannerText="Kanji"
            ></PremadeKanjiCard>
          ))}
        {vocabCardsDB.length !== 0 &&
          vocabCardsDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={Gate}
              title={card.title}
              description={card.description}
              bannerText="Vocab"
            ></PremadeKanjiCard>
          ))}
        {grammarCardsDB.length !== 0 &&
          grammarCardsDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={SunsetCity}
              title={card.title}
              description={card.description}
              bannerText="Grammar"
            ></PremadeKanjiCard>
          ))}
      </div>

      <Footer />
    </div>
  );
};
export default PreMadeKanjiSheets;
