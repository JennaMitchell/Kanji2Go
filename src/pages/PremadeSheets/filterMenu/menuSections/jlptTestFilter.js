import classes from "./jlptTestFilter.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../../store/store";

const JLPTTestFilter = () => {
  const dispatch = useDispatch();
  const [jlptOne, setJLPTOne] = useState();
  const [jlptTwo, setJLPTTwo] = useState();
  const [jlptThree, setJLPTThree] = useState();
  const [jlptFour, setJLPTFour] = useState();
  const [jlptFive, setJLPTFive] = useState();
  const [searchTermArray, setSearchTermArray] = useState([]);
  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );

  const dispatchFilteredKanjiHandler = (filtersArray) => {
    dispatch(storeActions.setPremadeKanjiFilterArray(filtersArray));
    dispatch(storeActions.setPremadeSheetFilteringActive("true"));
  };
  useEffect(() => {
    dispatchFilteredKanjiHandler(searchTermArray);
  }, [searchTermArray]);

  const jlptButtonHandler = (testType, buttonState) => {
    let tempArray = premadeKanjiFilterArray.slice();

    if (!buttonState) {
      tempArray.push(testType);
      setSearchTermArray(tempArray);
    } else {
      tempArray = tempArray.filter((type) => type !== testType);

      setSearchTermArray(tempArray);
    }
  };

  const jlptOneHandler = () => {
    jlptButtonHandler("JLPT1", jlptOne);
    setJLPTOne(!jlptOne);
  };

  const jlptTwoHandler = () => {
    jlptButtonHandler("JLPT2", jlptTwo);
    setJLPTTwo(!jlptTwo);
  };
  const jlptThreeHandler = () => {
    jlptButtonHandler("JLPT3", jlptThree);
    setJLPTThree(!jlptThree);
  };
  const jlptFourHandler = () => {
    jlptButtonHandler("JLPT4", jlptFour);

    setJLPTFour(!jlptFour);
  };
  const jlptFiveHandler = () => {
    jlptButtonHandler("JLPT5", jlptFive);
    setJLPTFive(!jlptFive);
  };

  return (
    <div className={classes.filterContainer}>
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
    </div>
  );
};
export default JLPTTestFilter;
