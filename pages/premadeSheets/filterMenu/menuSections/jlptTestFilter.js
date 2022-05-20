import classes from "./jlptTestFilter.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { storeActions } from "../../../../store/store";

const JLPTTestFilter = () => {
  const dispatch = useDispatch();
  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );
  const [jlptOne, setJLPTOne] = useState();
  const [jlptTwo, setJLPTTwo] = useState();
  const [jlptThree, setJLPTThree] = useState();
  const [jlptFour, setJLPTFour] = useState();
  const [jlptFive, setJLPTFive] = useState();
  const [searchTermArray, setSearchTermArray] = useState([]);
  const [removedSearch, setRemovedSearch] = useState();
  const [lengthOfSearchTermArray, setLengthOfSearchTermArray] = useState(0);

  const jlptOneHandler = () => {
    let tempArray = searchTermArray;

    // we are doing the above code so that the useEffect triggers the first time we click

    if (!jlptOne) {
      tempArray.push("JLPT1");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "JLPT1");
      setSearchTermArray(tempArray);
      setRemovedSearch("JLPT1");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setJLPTOne(!jlptOne);
  };

  const jlptTwoHandler = () => {
    let tempArray = searchTermArray;

    // we are doing the above code so that the useEffect triggers the first time we click
    if (!jlptTwo) {
      tempArray.push("JLPT2");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "JLPT2");
      setSearchTermArray(tempArray);
      setRemovedSearch("JLPT2");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setJLPTTwo(!jlptTwo);
  };
  const jlptThreeHandler = () => {
    let tempArray = searchTermArray;

    // we are doing the above code so that the useEffect triggers the first time we click
    if (!jlptThree) {
      tempArray.push("JLPT3");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "JLPT3");
      setSearchTermArray(tempArray);
      setRemovedSearch("JLPT3");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setJLPTThree(!jlptThree);
  };
  const jlptFourHandler = () => {
    let tempArray = searchTermArray;

    if (!jlptFour) {
      tempArray.push("JLPT4");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "JLPT4");
      setSearchTermArray(tempArray);
      setRemovedSearch("JLPT4");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setJLPTFour(!jlptFour);
  };
  const jlptFiveHandler = () => {
    let tempArray = searchTermArray;
    if (!jlptFive) {
      tempArray.push("JLPT5");
      setSearchTermArray(tempArray);
      setLengthOfSearchTermArray(lengthOfSearchTermArray + 1);
      if (removedSearch) {
        setRemovedSearch(false);
      }
    } else {
      tempArray = tempArray.filter((x) => x !== "JLPT5");
      setSearchTermArray(tempArray);
      setRemovedSearch("JLPT5");
      setLengthOfSearchTermArray(lengthOfSearchTermArray - 1);
    }
    setJLPTFive(!jlptFive);
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
    <>
      <h2 className={classes.subTitle}>&#160; JLPT Tests &#160;</h2>
      <div className={classes.jlptTestFilterContainer}>
        <div className={classes.jlptLineOne}>
          <div className={classes.jlptCheckbox}>
            <div className={classes.checkboxCheck} onClick={jlptOneHandler}>
              {jlptOne && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>JLPT1</p>
          </div>
          <div className={classes.jlptCheckbox}>
            <div className={classes.checkboxCheck} onClick={jlptTwoHandler}>
              {jlptTwo && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>JLPT2</p>
          </div>
          <div className={classes.jlptCheckbox}>
            <div className={classes.checkboxCheck} onClick={jlptThreeHandler}>
              {jlptThree && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>JLPT3</p>
          </div>
        </div>
        <div className={classes.jlptLineTwo}>
          <div className={classes.jlptCheckbox}>
            <div className={classes.checkboxCheck} onClick={jlptFourHandler}>
              {jlptFour && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>JLPT4</p>
          </div>
          <div className={classes.jlptCheckbox}>
            <div className={classes.checkboxCheck} onClick={jlptFiveHandler}>
              {jlptFive && <CheckIcon />}
            </div>
            <p className={classes.checkboxText}>JLPT5</p>
          </div>
        </div>
      </div>
    </>
  );
};
export default JLPTTestFilter;
