import classes from "./previewKanjiOnlyBlock.module.css";
const PreviewKanjiOnlyBlock = ({ data, downloadClicked }) => {
  let extractedData = data[0];
  return (
    <>
      <div className={classes.kanjiContainer}>
        <p
          className={
            downloadClicked
              ? `${classes.kanjiDownload} ${classes.kanji}`
              : `${classes.kanji}`
          }
        >
          {extractedData.kanji}
        </p>
        <p
          className={
            downloadClicked
              ? `${classes.textDownload} ${classes.text}`
              : `${classes.text}`
          }
        >
          Strokes: {extractedData.strokes}
        </p>
      </div>
    </>
  );
};
export default PreviewKanjiOnlyBlock;
