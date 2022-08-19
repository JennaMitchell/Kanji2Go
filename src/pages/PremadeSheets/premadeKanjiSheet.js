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
  const [grammarCardEnabler, setGrammarCardEnabler] = useState(true);
  const [kanjiCardEnabler, setKanjiCardEnabler] = useState(true);
  const [vocabCardEnabler, setVocabCardEnabler] = useState(true);
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
  const jlptTests = ["JLPT1", "JPLT2", "JLPT3", "JLPT4", "JLPT5"];
  const testTypes = ["Grammar", "Kanji", "Vocab"];

  const menuButtonHandler = () => {
    if (!premadeKanjiMenuButtonClicked) {
      dispatch(storeActions.setPremadeKanjiMenuButtonClicked(true));
      setGrammarCardEnabler(false);
      setKanjiCardEnabler(false);
      setVocabCardEnabler(false);
    } else {
      if (premadeKanjiFilterArray.length === 0) {
        dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
        setGrammarCardEnabler(true);
        setKanjiCardEnabler(true);
        setVocabCardEnabler(true);
      } else {
        dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
      }
    }
  };

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

  const filteringFunction = () => {
    // Filtering for Grammar, Kanji and Vocab
    let typeFilters = [];
    let jlptFilteredSearch = [];

    if (
      premadeKanjiFilterArray.length !== 0 &&
      premadeSheetFilteringActive !== 0
    ) {
      typeFilters = premadeKanjiFilterArray
        .slice()
        .filter((x) => testTypes.includes(x));
      jlptFilteredSearch = premadeKanjiFilterArray
        .slice()
        .filter((x) => jlptTests.includes(x));
    }

    if (
      premadeKanjiFilterArray.length !== 0 &&
      premadeSheetFilteringActive !== 0
    ) {
      if (typeFilters.includes("Grammar")) {
        setGrammarCardEnabler(true);
      } else {
        if (grammarCardEnabler) {
          setGrammarCardEnabler(false);
        }
      }
      if (typeFilters.includes("Kanji")) {
        setKanjiCardEnabler(true);
      } else {
        if (kanjiCardEnabler) {
          setKanjiCardEnabler(false);
        }
      }
      if (typeFilters.includes("Vocab")) {
        setVocabCardEnabler(true);
      } else {
        if (vocabCardEnabler) {
          setVocabCardEnabler(false);
        }
      }
    }

    if (premadeSheetFilteringActive !== 0 && typeFilters.length === 0) {
      // if no test types are  active then reset all filters to active

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
    // if no test filters are active but test types are

    if (
      typeFilters.length !== 0 &&
      premadeSheetFilteringActive !== 0 &&
      jlptFilteredSearch.length === 0
    ) {
      setFilteredKanjiDB(kanjiCardsDB);
      setFilteredVocabDB(vocabCardsDB);
      setFilteredGrammarDB(grammarCardsDB);
    }

    //Filtering for JLPT Tests
    // After filtering by type we check for each JLPT test and then filter out all corresponding cards

    if (
      premadeKanjiFilterArray.length !== 0 &&
      premadeSheetFilteringActive !== 0
    ) {
      if (typeFilters.includes("Grammar") && jlptFilteredSearch.length !== 0) {
        let tempArray = grammarCardsDB.slice();
        // creating a copy of the grammarcards
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempArray = tempArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }

        setFilteredGrammarDB(tempArray);
      }
      if (typeFilters.includes("Vocab") && jlptFilteredSearch.length !== 0) {
        let tempArray = vocabCardsDB.slice();
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempArray = tempArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        setFilteredVocabDB(tempArray);
      }
      if (typeFilters.includes("Kanji") && jlptFilteredSearch.length !== 0) {
        let tempArray = kanjiCardsDB.slice();
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempArray = tempArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        setFilteredKanjiDB(tempArray);
      }

      // Handeling Only JLPT test level Clicked

      if (
        typeFilters.length === 0 &&
        jlptFilteredSearch.length !== 0 &&
        premadeSheetFilteringActive !== 0
      ) {
        // Kanji
        let tempKanjiDBArray = kanjiCardsDB.slice();
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempKanjiDBArray = tempKanjiDBArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        setFilteredKanjiDB(tempKanjiDBArray);

        setKanjiCardEnabler(true);

        // Vocab

        let tempVocabArray = vocabCardsDB.slice();
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempVocabArray = tempVocabArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        setFilteredVocabDB(tempVocabArray);

        setVocabCardEnabler(true);

        // Grammar
        let tempGrammarArray = grammarCardsDB.slice();
        // creating a copy of the grammarcards
        for (let i = 0; i < jlptFilteredSearch.length; i++) {
          tempGrammarArray = tempGrammarArray.filter(
            (x) => x.title === jlptFilteredSearch[i]
          );
        }
        setFilteredGrammarDB(tempGrammarArray);

        setGrammarCardEnabler(true);
      }
    }
    // Reseting if test type array is blank
    if (
      typeFilters.length === 0 &&
      premadeSheetFilteringActive !== 0 &&
      jlptFilteredSearch.length === 0
    ) {
      setFilteredKanjiDB([]);
      setFilteredVocabDB([]);
      setFilteredGrammarDB([]);
    }
    dispatch(storeActions.setPremadeSheetFilteringActive(0));
    // at the end we reset the useEffect by setting the filter active state to false
  };

  // Use Effect For triggering the Filtering

  useEffect(() => {
    if (premadeSheetFilteringActive !== 0) {
      filteringFunction();
    }
  }, [premadeSheetFilteringActive]);

  return (
    <div className={`${loginButtonClicked ? classes.loginClickedHompage : ""}`}>
      <NavBar />
      <Container
        maxW="100%"
        h={{ base: "100px", sm: "125px", lg: "150px" }}
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
          fontSize={{ base: "32px", sm: "48px", lg: "64px" }}
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
