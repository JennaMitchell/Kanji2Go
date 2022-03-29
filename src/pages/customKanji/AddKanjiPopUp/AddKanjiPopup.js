import classes from "./addKanjiPopup.module.css";
import { CheckIcon, XIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import FilteredKanji from "./filteredKanji";
import DefinitionSelectorBlock from "./definitionSelectorBlock";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../store/store";


const AddKanjiPopup = () => {
  const [jlpt1FilterClicked, setJlpt1FilterClicked] = useState(false);
  const [jlpt2FilterClicked, setJlpt2FilterClicked] = useState(false);
  const [jlpt3FilterClicked, setJlpt3FilterClicked] = useState(false);
  const [jlpt4FilterClicked, setJlpt4FilterClicked] = useState(false);
  const [jlpt5FilterClicked, setJlpt5FilterClicked] = useState(false);
  const [testFilterClicked, setTestFilterClicked] = useState(false);
  const [strokeNumberSelected, setStrokeNumberSelected] = useState("All");
  const [testFilters, setTestFilters] = useState([]);
  const dispatch = useDispatch();

  const [selectedHelperBlock, setSelectedHelperBlock] = useState();
  const dropDownMenuHandler = (e) => {
    setStrokeNumberSelected(e.target.value);
  };
  const testFilterHandler = (e) => {
    setTestFilterClicked(+e.target.closest("button").value);
  };
  const selectedKanji = useSelector((state) => state.kanjiClicked);
  const selectHelperBlockHandler = (block) => {
    setSelectedHelperBlock(block);
  };
  const closingBtnHandler = () => {
    dispatch(storeActions.setAddKanjiMenu(false));
  };
  useEffect(() => {
    if (testFilterClicked === 1) {
      if (jlpt1FilterClicked) {
        setJlpt2FilterClicked(false);
        let tempArray = testFilters;
        tempArray = tempArray.filter((filter) => filter !== "JLPT1");
        setTestFilters(tempArray);
      } else {
        setJlpt1FilterClicked(true);
        let tempArray = testFilters;
        tempArray.push("JLPT1");
        setTestFilters(tempArray);
      }
      setTestFilterClicked(0);
    } else if (testFilterClicked === 2) {
      if (jlpt2FilterClicked) {
        setJlpt2FilterClicked(false);
        let tempArray = testFilters;
        tempArray = tempArray.filter((filter) => filter !== "JLPT2");
        setTestFilters(tempArray);
      } else {
        setJlpt2FilterClicked(true);
        let tempArray = testFilters;
        tempArray.push("JLPT2");
        setTestFilters(tempArray);
      }
      setTestFilterClicked(0);
    } else if (testFilterClicked === 3) {
      if (jlpt3FilterClicked) {
        setJlpt3FilterClicked(false);
        let tempArray = testFilters;
        tempArray = tempArray.filter((filter) => filter !== "JLPT3");
        setTestFilters(tempArray);
      } else {
        setJlpt3FilterClicked(true);
        let tempArray = testFilters;
        tempArray.push("JLPT3");
        setTestFilters(tempArray);
      }
      setTestFilterClicked(0);
    } else if (testFilterClicked === 4) {
      if (jlpt4FilterClicked) {
        setJlpt4FilterClicked(false);
        let tempArray = testFilters;
        tempArray = tempArray.filter((filter) => filter !== "JLPT4");
        setTestFilters(tempArray);
      } else {
        setJlpt4FilterClicked(true);
        let tempArray = testFilters;
        tempArray.push("JLPT4");
        setTestFilters(tempArray);
      }
      setTestFilterClicked(0);
    } else if (testFilterClicked === 5) {
      if (jlpt5FilterClicked) {
        setJlpt5FilterClicked(false);
        let tempArray = testFilters;
        tempArray = tempArray.filter((filter) => filter !== "JLPT5");
        setTestFilters(tempArray);
      } else {
        setJlpt5FilterClicked(true);
        let tempArray = testFilters;
        tempArray.push("JLPT5");
        setTestFilters(tempArray);
      }
      setTestFilterClicked(0);
    }
  }, [testFilterClicked]);
  const arrayOfStrokeNumbers = [];
  for (let i = 1; i < 65; i++) {
    arrayOfStrokeNumbers[i] = i;
  }
  arrayOfStrokeNumbers.unshift("All");
  console.log(selectedKanji);
  console.log(selectedHelperBlock);

  return (
    <div className={classes.popupWindow}>
      <button className={classes.closingIcon} onClick={closingBtnHandler}>
        <XIcon className={classes.icon} />
      </button>
      <h2 className={classes.filterTitle}>
        &nbsp; Select a Kanji To Add &nbsp;
      </h2>
      <div className={classes.testFilters}>
        <div className={classes.lineOne}>
          <div className={classes.filterSelector}>
            <button
              className={classes.filterBtn}
              value="1"
              onClick={testFilterHandler}
            >
              {jlpt1FilterClicked && <CheckIcon className={classes.icon} />}
            </button>
            <p className={classes.filterText}>JLPT1</p>
          </div>
          <div className={classes.filterSelector}>
            <button
              className={classes.filterBtn}
              value="2"
              onClick={testFilterHandler}
            >
              {jlpt2FilterClicked && <CheckIcon className={classes.icon} />}
            </button>
            <p className={classes.filterText}>JLPT2</p>
          </div>
          <div className={classes.filterSelector}>
            <button
              className={classes.filterBtn}
              value="3"
              onClick={testFilterHandler}
            >
              {jlpt3FilterClicked && <CheckIcon className={classes.icon} />}
            </button>
            <p className={classes.filterText}>JLPT3</p>
          </div>
        </div>
        <div className={classes.lineTwo}>
          <div className={classes.filterSelector}>
            <button
              className={classes.filterBtn}
              value="4"
              onClick={testFilterHandler}
            >
              {jlpt4FilterClicked && <CheckIcon className={classes.icon} />}
            </button>
            <p className={classes.filterText}>JLPT4</p>
          </div>
          <div className={classes.filterSelector} value="5">
            <button
              className={classes.filterBtn}
              value="5"
              onClick={testFilterHandler}
            >
              {jlpt5FilterClicked && (
                <CheckIcon className={classes.icon} value="5" />
              )}
            </button>
            <p className={classes.filterText}>JLPT5</p>
          </div>
        </div>
      </div>
      <div className={classes.strokesContainer}>
        <h2 className={classes.strokesTitle}>Number of Strokes</h2>
        <div>
          <select
            name="numberOfStrokes"
            id="numberOfStrokes"
            className={classes.dropDownMenu}
            onChange={dropDownMenuHandler}
          >
            {arrayOfStrokeNumbers.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className={classes.kanjiSelector}>
        <FilteredKanji
          testFilters={testFilters}
          numberOfStrokes={strokeNumberSelected}
        ></FilteredKanji>
      </div>
      <div className={classes.definitionBlockSelector}>
        <DefinitionSelectorBlock
          stateReturnFunction={selectHelperBlockHandler}
        />
      </div>
      {selectedHelperBlock && selectedKanji && (
        <button className={classes.submitEnabledButton}>Submit</button>
      )}
      {(!selectedHelperBlock || !selectedKanji) && (
        <button className={classes.submitDisabledButton}>Submit</button>
      )}
    </div>
  );
};
export default AddKanjiPopup;
