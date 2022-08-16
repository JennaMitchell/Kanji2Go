import classes from "./premadeKanjiSheets.module.css";
import { Container, Heading } from "@chakra-ui/react";

import Footer from "../../components/footer";

import { useSelector, useDispatch } from "react-redux";

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
import NavBar from "../../nav/navBar";
import { storeActions } from "../../store/store";

const PreMadeKanjiSheets = () => {
  const grammarCardEnabler = useSelector((state) => state.grammarCardEnabler);
  const kanjiCardEnabler = useSelector((state) => state.kanjiCardEnabler);
  const vocabCardEnabler = useSelector((state) => state.vocabCardEnabler);
  const premadeSheetFilteringActive = useSelector(
    (state) => state.premadeSheetFilteringActive
  );

  const dispatch = useDispatch();

  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const premadeKanjiMenuButtonClicked = useSelector(
    (state) => state.premadeKanjiMenuButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  const vocabCardsDB = useSelector((state) => state.vocabCardsDB);
  const grammarCardsDB = useSelector((state) => state.grammarCardsDB);
  const [filteredGrammarDB, setFilteredGrammarDB] = useState(grammarCardsDB);
  const [filteredKanjiDB, setFilteredKanjiDB] = useState(kanjiCardsDB);
  const [filteredVocabDB, setFilteredVocabDB] = useState(vocabCardsDB);

  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );

  const menuButtonHandler = () => {
    if (!premadeKanjiMenuButtonClicked) {
      dispatch(storeActions.setPremadeKanjiMenuButtonClicked(true));
      dispatch(storeActions.setGrammarCardEnabler(false));
      dispatch(storeActions.setKanjiCardEnabler(false));
      dispatch(storeActions.setVocabCardEnabler(false));
    } else {
      if (premadeKanjiFilterArray.length === 0) {
        dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
        dispatch(storeActions.setGrammarCardEnabler(true));
        dispatch(storeActions.setKanjiCardEnabler(true));
        dispatch(storeActions.setVocabCardEnabler(true));
      } else {
        dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
      }
    }
  };

  const jlptTests = ["JLPT1", "JPLT2", "JLPT3", "JLPT4", "JLPT5"];

  // used to handle refreshing
  useEffect(() => {
    if (kanjiCardsDB.length !== 0) {
      setFilteredKanjiDB(kanjiCardsDB);
    }
  }, [kanjiCardsDB]);
  useEffect(() => {
    if (grammarCardsDB.length !== 0) {
      setFilteredGrammarDB(grammarCardsDB);
    }
  }, [grammarCardsDB]);

  useEffect(() => {
    if (vocabCardsDB.length !== 0) {
      setFilteredVocabDB(vocabCardsDB);
    }
  }, [vocabCardsDB]);

  // filtering

  if (premadeKanjiFilterArray.length !== 0 && premadeSheetFilteringActive) {
    if (premadeKanjiFilterArray.includes("Grammar")) {
      dispatch(storeActions.setGrammarCardEnabler(true));
    } else {
      if (grammarCardEnabler) {
        dispatch(storeActions.setGrammarCardEnabler(false));
      }
    }
    if (premadeKanjiFilterArray.includes("Kanji")) {
      dispatch(storeActions.setKanjiCardEnabler(true));
    } else {
      if (kanjiCardEnabler) {
        dispatch(storeActions.setKanjiCardEnabler(false));
      }
    }
    if (premadeKanjiFilterArray.includes("Vocab")) {
      dispatch(storeActions.setVocabCardEnabler(true));
    } else {
      if (vocabCardEnabler) {
        dispatch(storeActions.setVocabCardEnabler(false));
      }
    }
    dispatch(storeActions.setPremadeSheetFilteringActive(false));
  } else if (
    premadeSheetFilteringActive &&
    premadeKanjiFilterArray.length === 0
  ) {
    if (!vocabCardEnabler) {
      dispatch(storeActions.setVocabCardEnabler(true));
    }
    if (!kanjiCardEnabler) {
      dispatch(storeActions.setKanjiCardEnabler(true));
    }
    if (!grammarCardEnabler) {
      dispatch(storeActions.setGrammarCardEnabler(true));
    }
    dispatch(storeActions.setPremadeSheetFilteringActive(false));
  }

  //fitering side effect

  if (premadeKanjiFilterArray.length !== 0 && premadeSheetFilteringActive) {
    let jlptFilteredSearch = premadeKanjiFilterArray
      .slice()
      .filter((x) => jlptTests.includes(x));
    if (
      premadeKanjiFilterArray.includes("Grammar") &&
      jlptFilteredSearch.length !== 0
    ) {
      let tempArray = grammarCardsDB.slice();
      for (let i = 0; i < jlptFilteredSearch.length; i++) {
        tempArray = tempArray.filter((x) => x.title === jlptFilteredSearch[i]);
      }
      setFilteredGrammarDB(tempArray);
      dispatch(storeActions.setPremadeSheetFilteringActive(false));
    }
    if (
      premadeKanjiFilterArray.includes("Vocab") &&
      jlptFilteredSearch.length !== 0
    ) {
      let tempArray = vocabCardsDB.slice();
      for (let i = 0; i < jlptFilteredSearch.length; i++) {
        tempArray = tempArray.filter((x) => x.title === jlptFilteredSearch[i]);
      }
      setFilteredVocabDB(tempArray);
      dispatch(storeActions.setPremadeSheetFilteringActive(false));
    }
    if (
      premadeKanjiFilterArray.includes("Vocab") &&
      jlptFilteredSearch.length !== 0
    ) {
      let tempArray = kanjiCardsDB.slice();
      for (let i = 0; i < jlptFilteredSearch.length; i++) {
        tempArray = tempArray.filter((x) => x.title === jlptFilteredSearch[i]);
      }
      setFilteredKanjiDB(tempArray);
      dispatch(storeActions.setPremadeSheetFilteringActive(false));
    }
  }

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
          fontSize={{ base: "36px", sm: "48px", lg: "64px" }}
          color="brand.900"
          borderBottom="2px"
        >
          Premade Kanji Sheets
        </Heading>
      </Container>
      <div className={classes.cardGrid}>
        <div
          className={`${classes.menuIconContainer} ${
            premadeKanjiMenuButtonClicked && classes.menuIconMoveOut
          }`}
        >
          <MenuIcon
            className={`${classes.menuIcon} ${
              premadeKanjiMenuButtonClicked && classes.menuIconMoveOut
            }`}
            onClick={menuButtonHandler}
          />
        </div>
        <PremadeKanjiFilterMenu
          menuButtonClicked={premadeKanjiMenuButtonClicked}
        />
        {kanjiCardEnabler &&
          filteredKanjiDB.length !== 0 &&
          filteredKanjiDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={MountainStart}
              title={card.title}
              description={card.description}
              bannerText="Kanji"
              pdfId={card.pdfId}
            ></PremadeKanjiCard>
          ))}
        {vocabCardEnabler &&
          filteredVocabDB.length !== 0 &&
          filteredVocabDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={Gate}
              title={card.title}
              description={card.description}
              pdfId={card.pdfId}
              bannerText="Vocab"
            ></PremadeKanjiCard>
          ))}
        {grammarCardEnabler &&
          filteredGrammarDB.length !== 0 &&
          filteredGrammarDB.map((card, index) => (
            <PremadeKanjiCard
              key={index}
              id={index}
              photo={SunsetCity}
              title={card.title}
              description={card.description}
              bannerText="Grammar"
              pdfId=""
            ></PremadeKanjiCard>
          ))}
      </div>

      <Footer />
    </div>
  );
};
export default PreMadeKanjiSheets;
