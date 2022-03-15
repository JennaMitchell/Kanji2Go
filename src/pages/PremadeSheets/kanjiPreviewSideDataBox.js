import classes from "./kanjiPreviewSideDataBox.module.css";
import { useSelector } from "react-redux";

const KanjiPreviewSideDataBox = (card) => {
  const kanjiClickedId = useSelector((state) => state.kanjiClickedId);

  return (
    <>
      
        <div className={classes.infoContainer}>
          <div className={classes.kanjiPicture}>{card.kanji}</div>
          <div className={classes.meaningContainer}>
            <p className={classes.meaningTitle}>Meaning</p>
            <p className={classes.meaning}>{card.meaning}</p>
          </div>
          <div className={classes.radicalContainer}>
            <p className={classes.radicalTitle}>Radical</p>
            <p className={classes.radical}>{card.radical}</p>
          </div>
          <div className={classes.readingsContainer}>
            <div className={classes.onyomiContainer}>
              <p className={classes.onyomiTitle}>Onyomi Readings</p>
              <p className={classes.onyomiKana}>{card.onyomiKana}</p>
              <p className={classes.onyomiEnglish}>{card.onyomiEnglish}</p>
            </div>
            <div className={classes.kunyomiContainer}>
              <p className={classes.kunyomiTitle}>Kunyomi Readings</p>
              <p className={classes.kuyomiKana}>{card.kunyomi}</p>
              <p className={classes.kunyomiEnglish}>{card.kunyoumiEnglish}</p>
            </div>
            <p className={classes.strokes}>{`(${card.strokes} strokes)`}</p>
          </div>
        </div>

    </>
  );
};
export default KanjiPreviewSideDataBox;
