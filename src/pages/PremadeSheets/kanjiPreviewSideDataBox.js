import classes from "./kanjiPreviewSideDataBox.module.css";
import { useSelector } from "react-redux";

const KanjiPreviewSideDataBox = (card) => {
  const kanjiClickedId = useSelector((state) => state.kanjiClickedId);

  const data = card["card"];

  return (
    <>
      <div className={classes.infoContainer}>
        <div className={classes.kanjiPicture}>{data.kanji}</div>
        <div className={classes.radMeaningContainer}>
          <div className={classes.meaningContainer}>
            <p className={classes.meaningTitle}>Meaning</p>
            <p className={classes.meaning}>{data.meaning}</p>
          </div>
          <div className={classes.radicalContainer}>
            <p className={classes.radicalTitle}>Radical</p>
            <p className={classes.radical}>{data.radical}</p>
          </div>
        </div>

        <div className={classes.onyomiContainer}>
          <p className={classes.onyomiTitle}>Onyomi Readings</p>
          <p className={classes.onyomiKana}>{data.onyomiKana}</p>
          <p className={classes.onyomiEnglish}>{data.onyomiEnglish}</p>
        </div>
        <div className={classes.kunyomiContainer}>
          <p className={classes.kunyomiTitle}>Kunyomi Readings</p>
          <p className={classes.kuyomiKana}>{data.kunyomi}</p>
          <p className={classes.kunyomiEnglish}>{data.kunyomiEnglish}</p>
        </div>
      </div>
    </>
  );
};
export default KanjiPreviewSideDataBox;
//   <p className={classes.strokes}>{`(${data.strokes} strokes)`}</p>
