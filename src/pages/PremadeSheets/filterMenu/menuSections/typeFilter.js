import classes from "./typeFilter.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";
const TypeFilter = () => {
  const dispatch = useDispatch();
  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );
  const [grammarFilterClicked, setGrammarFilterClicked] = useState(false);
  const [vocabFilterClicked, setVocabFilterClicked] = useState(false);
  const [kanjiFilterClicked, setKanjiFilterClicked] = useState(false);
  const [searchTermArray, setSearchTermArray] = useState([]);

  const dispatchFunction = (arrayToBeDispatched) => {
    dispatch(storeActions.setPremadeKanjiFilterArray(arrayToBeDispatched));
    dispatch(storeActions.setPremadeSheetFilteringActive("true"));
  };

  useEffect(() => {
    dispatchFunction(searchTermArray);
  }, [searchTermArray]);

  const filteringHandler = (buttonState, buttonType) => {
    let tempArray = premadeKanjiFilterArray.slice();
    if (!buttonState) {
      tempArray.push(buttonType);
      setSearchTermArray(tempArray);
    } else {
      tempArray = tempArray.filter((type) => type !== buttonType);
      setSearchTermArray(tempArray);
    }
  };

  const grammarFilterHandler = () => {
    filteringHandler(grammarFilterClicked, "Grammar");
    setGrammarFilterClicked(!grammarFilterClicked);
  };
  const vocabFilterHandler = () => {
    filteringHandler(vocabFilterClicked, "Vocab");

    setVocabFilterClicked(!vocabFilterClicked);
  };
  const kanjiFilterHandler = () => {
    filteringHandler(kanjiFilterClicked, "Kanji");
    setKanjiFilterClicked(!kanjiFilterClicked);
  };

  return (
    <div className={classes.filterContainer}>
      <h2 className={classes.subTitle}>&#160; Test Types &#160;</h2>
      <div className={classes.mainContainer}>
        <div className={classes.rowOne}>
          <div className={classes.checkbox}>
            <div className={classes.checkboxCheck} onClick={kanjiFilterHandler}>
              {kanjiFilterClicked && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>Kanji</p>
          </div>
          <div className={classes.checkbox}>
            <div className={classes.checkboxCheck} onClick={vocabFilterHandler}>
              {vocabFilterClicked && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>Vocab</p>
          </div>
        </div>
        <div className={classes.rowTwo}>
          <div className={classes.checkbox}>
            <div
              className={classes.checkboxCheck}
              onClick={grammarFilterHandler}
            >
              {grammarFilterClicked && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>Grammar</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default TypeFilter;
