import { useState } from "react";
import classes from "./kanjiPreviewSide.module.css";

const KanjiPreviewSide = ({
  kanji,
  kunyomi,
  kunyoumiEnglish,
  meaning,
  onyomiEnglish,
  onyomiKana,
  radical,
  strokes,
}) => {
  const [kanjiClicked, setKanjiClicked] = useState();
  return (
    <>
      <button className={classes.kanjiSelection}>{kanji}</button>
      {kanjiClicked && (
        <div className={classes.container}>
          <div>{kanji}</div>
          <div>
            <div>Meaning</div>
            <div>{meaning}</div>
          </div>
          <div>{radical}</div>
          <div>
            <div>
              <div>Onyomi Readings</div>
              <div>{onyomiKana}</div>
              <div>{onyomiEnglish}</div>
            </div>
            <div>
              <div>Kunyomi Readings</div>
              <div>{kunyomi}</div>
              <div>{kunyoumiEnglish}</div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
export default KanjiPreviewSide;
