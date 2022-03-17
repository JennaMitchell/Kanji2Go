import classes from "./premadeKanjiSheets.module.css";
import { Container, Heading } from "@chakra-ui/react";

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
import PremadeKanjiFilterMenu from "./filterMenu/premadeKanjiMenu";
import { useEffect, useState } from "react";

const PreMadeKanjiSheets = () => {
  const [grammarCardEnabler, setGrammarCardEnabler] = useState(true);
  const [kanjiCardEnabler, setKanjiCardEnabler] = useState(true);
  const [vocabCardEnabler, setVocabCardEnabler] = useState(true);
  const [lengthOfSearchTermArray, setLengthOfSearchTermArray] = useState(0);
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  const vocabCardsDB = useSelector((state) => state.vocabCardsDB);
  const grammarCardsDB = useSelector((state) => state.grammarCardsDB);
  const [menuButtonClicked, setMenuButtonClicked] = useState(false);
  const menuButtonHandler = () => {
    setMenuButtonClicked(!menuButtonClicked);
    setGrammarCardEnabler(false);
    setKanjiCardEnabler(false);
    setVocabCardEnabler(false);
  };
  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );
  const jlptTests = ["JLPT1", "JPLT2", "JLPT3", "JLPT4", "JLPT5"];

  useEffect(() => {
    if (premadeKanjiFilterArray.length !== 0) {
      if (premadeKanjiFilterArray.includes("Grammar")) {
        setGrammarCardEnabler(true);
      } else {
        if (grammarCardEnabler) {
          setGrammarCardEnabler(false);
        }
      }
      if (premadeKanjiFilterArray.includes("Kanji")) {
        setKanjiCardEnabler(true);
      } else {
        if (kanjiCardEnabler) {
          setKanjiCardEnabler(false);
        }
      }
      if (premadeKanjiFilterArray.includes("Vocab")) {
        setVocabCardEnabler(true);
      } else {
        if (vocabCardEnabler) {
          setVocabCardEnabler(false);
        }
      }
    } else {
      if (!vocabCardEnabler) {
        setVocabCardEnabler(true);
      }
      if (!kanjiCardEnabler) {
        setKanjiCardEnabler(true);
      }
      if (!grammarCardEnabler) {
        setGrammarCardEnabler(true);
      }
    }
  }, [premadeKanjiFilterArray]);

  useEffect(() => {
    if (premadeKanjiFilterArray.length !== 0) {
      let jlptFilteredSearch = premadeKanjiFilterArray
        .slice()
        .filter((x) => jlptTests.includes(x));
      if (
        premadeKanjiFilterArray.includes("Grammar") &&
        jlptFilteredSearch.length !== 0
      ) {
        let tempArray = grammarCardsDB.slice();
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempArray = tempArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        console.log(tempArray);
      }
    }
  }, [premadeKanjiFilterArray]);

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
        transition="1s"
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
        <div
          className={`${classes.menuIconContainer} ${
            menuButtonClicked && classes.menuIconMoveOut
          }`}
        >
          <MenuIcon
            className={`${classes.menuIcon} ${
              menuButtonClicked && classes.menuIconMoveOut
            }`}
            onClick={menuButtonHandler}
          />
        </div>
        <PremadeKanjiFilterMenu menuButtonClicked={menuButtonClicked} />
        {kanjiCardEnabler &&
          kanjiCardsDB.length !== 0 &&
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
        {vocabCardEnabler &&
          vocabCardsDB.length !== 0 &&
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
        {grammarCardEnabler &&
          grammarCardsDB.length !== 0 &&
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