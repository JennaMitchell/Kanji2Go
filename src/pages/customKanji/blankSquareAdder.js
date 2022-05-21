import classes from "./blankSquareAdder.module.css";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";

import { useState } from "react";

const BlankSquareAdder = () => {
  let arrayOfNumbers = [];
  for (let i = 0; i < 30; i++) {
    arrayOfNumbers[i] = i;
  }
  const dispatch = useDispatch();
  const [dropDownMenuVal, setDropDownMenuVal] = useState(0);
  const closingBtnHandler = () => {
    dispatch(storeActions.setBlankSquareMenu(false));
  };
  const dropDownMenuHandler = (e) => {
    setDropDownMenuVal(e.target.value);
  };
  const submitButtonHandler = () => {
    let numberArray = [];
    for (let index = 0; index < dropDownMenuVal; index++) {
      numberArray[index] = index;
    }
    dispatch(storeActions.setBlankSquaresArray(numberArray));
    dispatch(storeActions.setBlankSquareMenu(false));
  };
  const fillButtonHandler = () => {
    dispatch(storeActions.setFillButtonClicked(true));
    dispatch(storeActions.setBlankSquareMenu(false));
  };

  return (
    <div className={classes.blankAddContainer}>
      <button className={classes.closingBtn} onClick={closingBtnHandler}>
        <XIcon className={classes.icon} />
      </button>
      <h2 className={classes.mainTitle}>Blanks Creator</h2>
      <div className={classes.selector}>
        <h3 className={classes.numberHelperText}>How many?</h3>
        <select
          name="numberOfBlanks"
          id="numberOfBlanks"
          className={classes.dropDownMenu}
          onChange={dropDownMenuHandler}
        >
          {arrayOfNumbers.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.btnContainer}>
        <button
          className={`${classes.btn} ${classes.activeButton}`}
          onClick={fillButtonHandler}
        >
          Fill
        </button>

        {+dropDownMenuVal !== 0 ? (
          <button
            onClick={submitButtonHandler}
            className={`${classes.activeButton}  ${classes.btn}`}
          >
            {" "}
            Submit
          </button>
        ) : (
          <button className={`${classes.submitButtonDisabled} ${classes.btn}`}>
            Submit
          </button>
        )}
      </div>
    </div>
  );
};
export default BlankSquareAdder;
