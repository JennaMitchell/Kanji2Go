import classes from "./blankSquareAdder.module.css";
import { XIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";

const BlankSquareAdder = () => {
  let arrayOfNumbers = [];
  for (let i = 1; i < 30; i++) {
    arrayOfNumbers[i] = i;
  }
  const dispatch = useDispatch();
  const closingBtnHandler = () => {
    dispatch(storeActions.setBlankSquareMenu(false));
  };

  return (
    <div className={classes.blankAddContainer}>
      <button className={classes.closingBtn} onClick={closingBtnHandler}>
        <XIcon className={classes.icon} />
      </button>
      <div className={classes.titleContainer}>
        <h2 className={classes.mainTitle}>
          &nbsp; Select How Many To Add&nbsp;
        </h2>
        <h2 className={classes.orTitle}> &nbsp; or &nbsp;</h2>
        <h2 className={classes.mainTitle}>
          &nbsp; Fill the Remaining Space &nbsp;
        </h2>
      </div>
      <div className={classes.selector}>
        <h3 className={classes.numberHelperText}> How many? </h3>
        <select
          name="numberOfBlanks"
          id="numberOfBlanks"
          className={classes.dropDownMenu}
        >
          {arrayOfNumbers.map((value, index) => (
            <option key={index} value={value}>
              {value}
            </option>
          ))}
        </select>
      </div>
      <div className={classes.btnContainer}>
        <button className={classes.button}>Fill</button>
        <button className={classes.button}>Submit</button>
      </div>
    </div>
  );
};
export default BlankSquareAdder;
