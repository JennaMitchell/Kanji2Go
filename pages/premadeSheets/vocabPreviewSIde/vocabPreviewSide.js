import { useState, useEffect } from "react";

import classes from "./vocabPreviewSide.module.css";

import VocabPreviewSideDataBox from "./vocabPreviewSideDataBox";

const VocabPreviewSide = ({
  vocab,
  card,
  id,
  vocabClickedFunction,
  activeVocab,
}) => {
  const [vocabClicked, setVocabClicked] = useState(false);
  const [savedId, setSavedId] = useState(id);
  const [savedVocabData, setSavedVocabData] = useState(card);

  const vocabButtonHandler = () => {
    vocabClickedFunction(savedId);
  };
  console.log(card);
  useEffect(() => {
    if (vocabClicked === true && activeVocab === savedId) {
      setVocabClicked(false);
    } else if (activeVocab === savedId) {
      setVocabClicked(true);
    } else if (activeVocab !== savedId && vocabClicked === true) {
      setVocabClicked(false);
    }
  }, [activeVocab]);

  return (
    <>
      <button
        onClick={vocabButtonHandler}
        className={`${classes.vocabSelection} ${
          vocabClicked && classes.vocabClicked
        } `}
      >
        {vocab}
      </button>
      {vocabClicked && <VocabPreviewSideDataBox card={savedVocabData} />}
    </>
  );
};
export default VocabPreviewSide;
