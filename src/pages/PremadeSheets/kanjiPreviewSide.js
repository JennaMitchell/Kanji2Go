import { useState, useEffect } from "react";

import classes from "./kanjiPreviewSide.module.css";

import KanjiPreviewSideDataBox from "./kanjiPreviewSideDataBox";

const KanjiPreviewSide = ({
  kanji,
  card,
  id,
  kanjiClickedFunction,
  activeKanji,
}) => {
  const [kanjiClicked, setKanjiClicked] = useState(false);
  const [savedId, setSavedId] = useState(id);
  const [savedKanjiData, setSavedKanjiData] = useState(card);

  const kanjiButtonHandler = () => {
    kanjiClickedFunction(savedId);
  };
  useEffect(() => {
    if (kanjiClicked === true && activeKanji === savedId) {
      setKanjiClicked(false);
    } else if (activeKanji === savedId) {
      setKanjiClicked(true);
    } else if (activeKanji !== savedId && kanjiClicked === true) {
      setKanjiClicked(false);
    }
  }, [activeKanji]);

  return (
    <>
      <button
        onClick={kanjiButtonHandler}
        className={`${classes.kanjiSelection} ${
          kanjiClicked && classes.kanjiClicked
        }`}
      >
        {kanji}
      </button>
      {kanjiClicked && <KanjiPreviewSideDataBox card={savedKanjiData} />}
    </>
  );
};
export default KanjiPreviewSide;
