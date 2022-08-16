import classes from "./premadeKanjiCard.module.css";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import KanjiPreviewSide from "./kanjiPreviewSide";
import VocabPreviewSide from "./vocabPreviewSIde/vocabPreviewSide";
import { DownloadIcon } from "@heroicons/react/solid";
import kanjiSheetDatabase from "../../img/KanjiSheets/KanjiSheetDatabase";
import vocabPdfDatabase from "../../img/VocabSheets/pdfMasterFIle";
import { useSelector } from "react-redux";
const PremadeKanjiCard = ({
  photo,
  title,
  description,
  bannerText,
  id,
  pdfId,
}) => {
  const [previewIconClicked, setPreviewIconClicked] = useState(false);
  const [cardList, setCardList] = useState([]);
  const previewIconHandler = () => {
    setPreviewIconClicked(!previewIconClicked);
  };

  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  const vocabCardsDB = useSelector((state) => state.vocabCardsDB);
  const [idClicked, setIdClicked] = useState(null);
  const [previewButtons, setPreviewButtons] = useState();
  const [initialRender, setInitialRender] = useState(true);

  const idButtonHandler = (id) => {
    setIdClicked(id);
  };

  if (initialRender) {
    if (bannerText === "Kanji") {
      if (kanjiCardsDB.length !== 0) {
        let tempArray = [];
        let objectToBeFiltered = kanjiCardsDB[id].kanjiList;
        for (let i = 0; i < 10; i++) {
          tempArray.push(objectToBeFiltered[`kanji${i}`]);
        }
        setCardList(tempArray);
        setInitialRender(false);
      }
    }
    if (bannerText === "Vocab") {
      if (vocabCardsDB.length !== 0) {
        let tempArray = [];
        let objectToBeFiltered = vocabCardsDB[id].vocabData;
        for (let i = 1; i < 10; i++) {
          tempArray.push(objectToBeFiltered[`term0${i}`]);
        }
        setCardList(tempArray);
        setInitialRender(false);
      }
    }
  }

  // creating preview side

  useEffect(() => {
    if (cardList.length !== 0) {
      if (bannerText === "Kanji") {
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

      if (bannerText === "Vocab") {
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
  }, [idClicked, previewIconClicked, bannerText, cardList]);

  /// Handling the releated pdf links
  let pdfReference = "";
  if (pdfId.includes("Kanji")) {
    pdfReference = kanjiSheetDatabase[pdfId];
  } else if (pdfId.includes("Vocab")) {
    pdfReference = vocabPdfDatabase[pdfId];
  }

  return (
    <div className={classes.cardContainer}>
      <a
        href={pdfReference}
        className={classes.downloadIconContainer}
        target="blank"
      >
        <DownloadIcon className={classes.previewIcon} />
      </a>
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
              bannerText === "Kanji" && classes.kanjiSelectorButtons
            } ${bannerText === "Grammar" && classes.kanjiSelectorButtons} ${
              bannerText === "Vocab" && classes.vocabSelectorButtons
            }`}
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
          <img
            src={photo}
            className={classes.previewImage}
            alt="decorative scene"
          />
          <h3 className={classes.jlptHeader}>{title}</h3>
          <p className={classes.description}>{description}</p>
        </>
      )}
    </div>
  );
};

export default PremadeKanjiCard;
