import classes from "./premadeKanjiCard.module.css";

import { EyeIcon, EyeOffIcon } from "@heroicons/react/solid";
import { Image, Text, Heading } from "@chakra-ui/react";
import { useState } from "react";
const PremadeKanjiCard = ({ photo, title, description, bannerText }) => {
  const [previewIconClicked, setPreviewIconClicked] = useState(false);
  const previewIconHandler = () => {
    setPreviewIconClicked(!previewIconClicked);
  };
  return (
    <div className={classes.cardContainer}>
      <button
        className={classes.previewIconContainer}
        onClick={previewIconHandler}
      >
        {previewIconClicked ? (
          <EyeOffIcon></EyeOffIcon>
        ) : (
          <EyeIcon className={classes.previewIcon}></EyeIcon>
        )}
      </button>
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
      {previewIconClicked ? (
        <div></div>
      ) : (
        <>
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
