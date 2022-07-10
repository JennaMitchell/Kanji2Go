import classes from "./typeFilter.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
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
  const [removedSearch, setRemovedSearch] = useState(false);
  const [lengthOfSearchTermArray, setLengthOfSearchTermArray] = useState(0);
  const grammarFilterHandler = () => {
    let tempArray = searchTermArray;

    if (!grammarFilterClicked) {
      tempArray.push("Grammar");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "Grammar");
      setSearchTermArray(tempArray);
      setRemovedSearch("Grammar");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setGrammarFilterClicked(!grammarFilterClicked);
  };
  const vocabFilterHandler = () => {
    let tempArray = searchTermArray;

    if (!vocabFilterClicked) {
      tempArray.push("Vocab");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "Vocab");
      setSearchTermArray(tempArray);
      setRemovedSearch("Vocab");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setVocabFilterClicked(!vocabFilterClicked);
  };
  const kanjiFilterHandler = () => {
    let tempArray = searchTermArray;

    if (!kanjiFilterClicked) {
      tempArray.push("Kanji");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "Kanji");
      setSearchTermArray(tempArray);
      setRemovedSearch("Kanji");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setKanjiFilterClicked(!kanjiFilterClicked);
  };
  useEffect(() => {
    if (removedSearch) {
      let tempArray = premadeKanjiFilterArray.slice();
      tempArray = tempArray.filter((x) => x !== removedSearch);
      dispatch(storeActions.setPremadeKanjiFilterArray(tempArray));
    } else {
      if (searchTermArray !== null) {
        let tempArray = premadeKanjiFilterArray.slice();
        for (let i = 0; i < searchTermArray.length; i++) {
          if (!tempArray.includes(searchTermArray[i])) {
            tempArray.push(searchTermArray[i]);
          }
        }
        dispatch(storeActions.setPremadeKanjiFilterArray(tempArray));
      }
    }
  }, [lengthOfSearchTermArray]);

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
