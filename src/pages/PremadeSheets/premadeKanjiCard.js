import classes from "./premadeKanjiCard.module.css";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Image, Text, Heading } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import KanjiPreviewSide from "./kanjiPreviewSide";

import { useSelector } from "react-redux";
const PremadeKanjiCard = ({ photo, title, description, bannerText }) => {
  const [previewIconClicked, setPreviewIconClicked] = useState(false);
  const [kanjiList, setKanjiList] = useState();
  const previewIconHandler = () => {
    setPreviewIconClicked(!previewIconClicked);
  };
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  useEffect(() => {
    if (kanjiCardsDB.length !== 0) {
      let tempArray = [];
      let objectToBeFiltered = kanjiCardsDB[0].kanjiList;
      for (let i = 1; i < 11; i++) {
        if (i === 10) {
          tempArray.push(objectToBeFiltered["kanji91"]);
        } else {
          tempArray.push(objectToBeFiltered[`kanji${i}`]);
        }
      }
      setKanjiList(tempArray);
    }
  }, []);

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
          <div className={classes.kanjiSelectorButtons}>
            {kanjiList.length !== 0 &&
              kanjiList.map((card) => (
                <KanjiPreviewSide
                  kanji={card.kanji}
                  card={card}
                  id={card.id}
                  key={card.id}
                />
              ))}
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
