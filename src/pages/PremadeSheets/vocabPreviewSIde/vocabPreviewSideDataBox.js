import classes from "./vocabPreviewSideDataBox.module.css";

const VocabPreviewSideDataBox = (card) => {
  console.log(card);
  const data = card["card"];
  // definition hirgana/english/ term

  return (
    <>
      <div className={classes.infoContainer}>
        <div className={classes.term}>{data.term}</div>
        <div className={classes.dataContainer}>
          <div className={classes.hiraganaContainer}>
            <h3 className={classes.hiraganaTitle}>Pronunciation</h3>
            <p className={classes.dataText}>{data.hiragana}</p>
            <p className={classes.dataText}>{data.hiraganaEnglish}</p>
          </div>
          <div className={classes.definitionContainer}>
            <h3 className={classes.definitionTitle}>Definition</h3>
            <p className={classes.dataText}>{data.definition}</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default VocabPreviewSideDataBox;
//   <p className={classes.strokes}>{`(${data.strokes} strokes)`}</p>
