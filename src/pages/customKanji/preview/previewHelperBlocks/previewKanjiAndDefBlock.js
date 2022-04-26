import classes from "./previewKanjiAndDefBlock.module.css";
const PreviewKanjiAndDefinitionBlock = ({ data, id, downloadClicked }) => {
  let extractedData = data[0];
  return (
    <>
      <div className={classes.kanjiContainer}>
        <div
          className={
            downloadClicked
              ? `${classes.kanjiDownload} ${classes.kanji}`
              : `${classes.kanji}`
          }
        >
          {extractedData.kanji}
        </div>
        <div
          className={
            downloadClicked
              ? `${classes.strokeTextDownload} ${classes.strokeText}`
              : `${classes.strokeText}`
          }
        >
          Strokes: {extractedData.strokes}
        </div>
      </div>
      <div className={classes.textContainer}>
        <h3
          className={
            downloadClicked
              ? `${classes.titleDownload} ${classes.title}`
              : `${classes.title}`
          }
        >
          Definition
        </h3>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          {extractedData.meaning}
        </p>
      </div>
      <div className={classes.textContainer}>
        <h3
          className={
            downloadClicked
              ? `${classes.titleDownload} ${classes.title}`
              : `${classes.title}`
          }
        >
          Kunyomi
        </h3>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          {extractedData.kunyomi}
        </p>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          {extractedData.kunyomiEnglish}
        </p>
      </div>
      <div className={classes.textContainer}>
        <h3
          className={
            downloadClicked
              ? `${classes.titleDownload} ${classes.title}`
              : `${classes.title}`
          }
        >
          Onyomi
        </h3>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          {extractedData.onyomiKana}
        </p>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          {extractedData.onyomiEnglish}
        </p>
      </div>
    </>
  );
};
export default PreviewKanjiAndDefinitionBlock;
