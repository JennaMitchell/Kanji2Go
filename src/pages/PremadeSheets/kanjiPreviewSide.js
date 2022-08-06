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



  const kanjiButtonHandler = () => {
    kanjiClickedFunction(id);
  };

  useEffect(() => {
    if (kanjiClicked === true && activeKanji === id) {
      setKanjiClicked(false);
    } else if (activeKanji === id) {
      setKanjiClicked(true);
    } else if (activeKanji !== id && kanjiClicked === true) {
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
      {kanjiClicked && <KanjiPreviewSideDataBox card={card} />}
    </>
  );
};
export default KanjiPreviewSide;
