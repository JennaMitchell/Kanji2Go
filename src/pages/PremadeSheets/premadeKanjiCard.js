import classes from "./premadeKanjiCard.module.css";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Image, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import KanjiPreviewSide from "./kanjiPreviewSide";
import VocabPreviewSide from "./vocabPreviewSIde/vocabPreviewSide";

import { useSelector } from "react-redux";
const PremadeKanjiCard = ({ photo, title, description, bannerText, id }) => {
  const [previewIconClicked, setPreviewIconClicked] = useState(false);
  const [cardList, setCardList] = useState([]);
  const previewIconHandler = () => {
    setPreviewIconClicked(!previewIconClicked);
  };

  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  const vocabCardsDB = useSelector((state) => state.vocabCardsDB);
  const [idClicked, setIdClicked] = useState(null);
  const [previewButtons, setPreviewButtons] = useState();
  const [savedBannerText, setSavedBannerText] = useState(bannerText);
  const idButtonHandler = (id) => {
    setIdClicked(id);
  };

  useEffect(() => {
    if (bannerText === "Kanji") {
      if (kanjiCardsDB.length !== 0) {
        let tempArray = [];
        let objectToBeFiltered = kanjiCardsDB[id].kanjiList;
        for (let i = 0; i < 10; i++) {
          tempArray.push(objectToBeFiltered[`kanji${i}`]);
        }
        setCardList(tempArray);
      }
    }
    if (bannerText === "Vocab") {
      if (vocabCardsDB.length !== 0) {
        let tempArray = [];
        let objectToBeFiltered = vocabCardsDB[id].vocabData;
        console.log(vocabCardsDB[id]);
        for (let i = 1; i < 10; i++) {
          tempArray.push(objectToBeFiltered[`term0${i}`]);
        }
        setCardList(tempArray);
      }
    }
  }, []);
  // creating preview side

  useEffect(() => {
    if (cardList.length !== 0) {
      if (savedBannerText === "Kanji") {
        setPreviewButtons(
          <>
            {cardList.length !== 0 &&
              cardList.map((card) => (
                <KanjiPreviewSide
                  kanji={card.kanji}
                  card={card}
                  id={card.id}
                  key={card.id}
                  kanjiClickedFunction={idButtonHandler}
                  activeKanji={idClicked}
                />
              ))}
          </>
        );
      }

      if (savedBannerText === "Vocab") {
        setPreviewButtons(
          <>
            {cardList.length !== 0 &&
              cardList.map((card) => (
                <VocabPreviewSide
                  vocab={card.term}
                  card={card}
                  id={card.id}
                  key={card.id}
                  vocabClickedFunction={idButtonHandler}
                  activeVocab={idClicked}
                />
              ))}
          </>
        );
      }
    }
  }, [idClicked, previewIconClicked]);

  return (
    <div className={classes.cardContainer}>
      <button
        className={classes.previewIconContainer}
        onClick={previewIconHandler}
      >
        {previewIconClicked ? (
          <EyeOffIcon className={classes.previewIcon}></EyeOffIcon>
        ) : (
          <EyeIcon className={classes.previewIcon}></EyeIcon>
        )}
      </button>

      {previewIconClicked ? (
        <div className={classes.kanjiSelectionContainer}>
          <div
            className={`${
              savedBannerText === "Kanji" && classes.kanjiSelectorButtons
            } ${
              savedBannerText === "Grammar" && classes.kanjiSelectorButtons
            } ${savedBannerText === "Vocab" && classes.vocabSelectorButtons}`}
          >
            {previewButtons}
          </div>
        </div>
      ) : (
        <>
          <div
            className={`${classes.banner} ${
              bannerText === "Kanji" && classes.blueBanner
            } ${bannerText === "Vocab" && classes.greenBanner} 
        ${bannerText === "Grammar" && classes.redBanner}`}
          >
            {bannerText}
            <div
              className={`${classes.bannerShadow} ${
                bannerText === "Kanji" && classes.bannerShadowBlue
              } ${bannerText === "Vocab" && classes.bannerShadowGreen} 
        ${bannerText === "Grammar" && classes.bannerShadowRed}`}
            ></div>
          </div>
          <Image h="90%" w="90%" p="10px" pt="25px" src={photo}></Image>
          <Heading w="fill" h="max-content" textAlign="center">
            {title}
          </Heading>
          <Text pb="20px" textAlign="center">
            {description}
          </Text>
        </>
      )}
    </div>
  );
};

export default PremadeKanjiCard;
