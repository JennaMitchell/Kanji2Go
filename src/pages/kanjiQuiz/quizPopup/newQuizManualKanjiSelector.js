import classes from "./newQuizManualKanjiSelector.module.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import QuizFilteredKanji from "./quizFilteredKanji";
import { XIcon, CheckIcon } from "@heroicons/react/solid";
import QuizKanjiSelectorCard from "./quizKanjiSelectorCard";
import SelectedKanjiCard from "./selectedKanjiCard";

const NewQuizManualKanjiSelector = ({
  retreiveKanjiSelectedFunction,
  manualDialogOpen,
  onCloseFunction,
}) => {
  const preventAutoClose = (e) => e.stopPropagation();
  // prevents the window from closing when the use clicks on the dialog box
  const ref = useRef(null);
  const numberOfQuestionsArray = [];
  const quizKanjiClicked = useSelector((state) => state.quizKanjiClicked);
  const deleteSelectedKanji = useSelector((state) => state.deleteSelectedKanji);
  const [selectedKanjiArray, setSelectedKanjiArray] = useState([]);
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState();
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const numberOfQuestionsHandler = (e) => {
    if (+e.target.value > 0) {
      setNumberOfQuestions(e.target.value);
      if (selectedKanjiArray.length > 0) {
        setSubmitButtonEnabled(true);
      }
    } else {
      setSubmitButtonEnabled(false);
    }
  };

  // useEffect Below handles when the user clicks on a kanji in the select kanji section
  useEffect(() => {
    if (quizKanjiClicked !== "") {
      let tempArray = selectedKanjiArray.slice();
      if (!tempArray.includes(quizKanjiClicked)) {
        tempArray.push(quizKanjiClicked);
        setSelectedKanjiArray(tempArray);
      }
    }
  }, [quizKanjiClicked]);

  // useEffect Below handles when the user clicks on a kanji in the selected kanji section
  useEffect(() => {
    if (deleteSelectedKanji !== "") {
      let tempArray = selectedKanjiArray.slice();
      tempArray = tempArray.filter((kanji) => kanji !== deleteSelectedKanji);
      setSelectedKanjiArray(tempArray);
    }
  }, [deleteSelectedKanji]);

  // filtering Kanji Based On

  useEffect(() => {
    if (manualDialogOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [manualDialogOpen]);

  for (let i = 0; i < 30; i++) {
    numberOfQuestionsArray[i] = i + 1;
  }
  numberOfQuestionsArray.unshift("All");

  const [jlpt1FilterClicked, setJlpt1FilterClicked] = useState(false);
  const [jlpt2FilterClicked, setJlpt2FilterClicked] = useState(false);
  const [jlpt3FilterClicked, setJlpt3FilterClicked] = useState(false);
  const [jlpt4FilterClicked, setJlpt4FilterClicked] = useState(false);
  const [jlpt5FilterClicked, setJlpt5FilterClicked] = useState(false);
  const [testFilterClicked, setTestFilterClicked] = useState(false);

  const [strokeNumberSelected, setStrokeNumberSelected] = useState("All");
  const [testFilters, setTestFilters] = useState([]);

  const dropDownMenuHandler = (e) => {
    if (+e.target.value <= 64 && +e.target.value > 0) {
      setStrokeNumberSelected(e.target.value);
    } else if (e.target.value === "All") {
      setStrokeNumberSelected(e.target.value);
    }
  };

  const jlptOneFilterHandler = () => {
    setTestFilterClicked(1);
  };
  const jlptTwoFilterHandler = () => {
    setTestFilterClicked(2);
  };
  const jlptThreeFilterHandler = () => {
    setTestFilterClicked(3);
  };
  const jlptFourFilterHandler = () => {
    setTestFilterClicked(4);
  };
  const jlptFiveFilterHandler = () => {
    setTestFilterClicked(5);
  };

  const closingBtnHandler = () => {
    onCloseFunction();
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

  let arrayOfQuestionNumbers = [];
  for (let j = 0; j < selectedKanjiArray.length; j++) {
    arrayOfQuestionNumbers[j] = j + 1;
  }
  if (arrayOfQuestionNumbers.length !== 0) {
    arrayOfQuestionNumbers.unshift("");
  }
  //Handling Submit Button

  const getRandomInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const selectingRandomNumberOfKanji = (kanjiArray, numberOfQuestions) => {
    let randomlySelectedKanjiArray = [];
    let arrayOfRemovedKanji = kanjiArray.slice();
    for (let i = 0; i < numberOfQuestions; i++) {
      let numberOfKanji = arrayOfRemovedKanji.length - 1;
      let randomInt = getRandomInt(numberOfKanji);
      randomlySelectedKanjiArray[i] = arrayOfRemovedKanji[randomInt];
      arrayOfRemovedKanji.splice(randomInt, 1);
    }
    return randomlySelectedKanjiArray;
  };

  const sumbitButtonHandler = () => {
    let finalSelectedKanji = [];
    finalSelectedKanji = selectingRandomNumberOfKanji(
      selectedKanjiArray,
      numberOfQuestions
    );

    // creating object format
    let objectedKanjiArray = [];
    for (let i = 0; i < finalSelectedKanji.length; i++) {
      objectedKanjiArray[i] = { kanji: finalSelectedKanji[i] };
    }

    retreiveKanjiSelectedFunction(objectedKanjiArray, numberOfQuestions);
    onCloseFunction();
  };

  return (
    <dialog className={classes.dialogContainer} ref={ref}>
      <div className={classes.popupWindow} onClick={preventAutoClose}>
        <button className={classes.closingIcon} onClick={closingBtnHandler}>
          <XIcon className={classes.icon} />
        </button>

        <h2 className={classes.filterTitle}>
          &nbsp; Manually Select Kanji &nbsp;
        </h2>
        <div className={classes.testFilters}>
          <div className={classes.lineOne}>
            <div className={classes.filterSelector}>
              <button
                className={classes.filterBtn}
                onClick={jlptOneFilterHandler}
              >
                {jlpt1FilterClicked && <CheckIcon className={classes.icon} />}
              </button>
              <p className={classes.filterText}>JLPT1</p>
            </div>
            <div className={classes.filterSelector}>
              <button
                className={classes.filterBtn}
                onClick={jlptTwoFilterHandler}
              >
                {jlpt2FilterClicked && <CheckIcon className={classes.icon} />}
              </button>
              <p className={classes.filterText}>JLPT2</p>
            </div>
            <div className={classes.filterSelector}>
              <button
                className={classes.filterBtn}
                onClick={jlptThreeFilterHandler}
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
                onClick={jlptFourFilterHandler}
              >
                {jlpt4FilterClicked && <CheckIcon className={classes.icon} />}
              </button>
              <p className={classes.filterText}>JLPT4</p>
            </div>
            <div className={classes.filterSelector}>
              <button
                className={classes.filterBtn}
                onClick={jlptFiveFilterHandler}
              >
                {jlpt5FilterClicked && <CheckIcon className={classes.icon} />}
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
          <QuizFilteredKanji
            testFilters={testFilters}
            numberOfStrokes={strokeNumberSelected}
          ></QuizFilteredKanji>
        </div>
        <h2 className={classes.filterTitle}>&nbsp;Selected Kanji&nbsp;</h2>
        <div className={classes.kanjiSelector}>
          {selectedKanjiArray.map((card, index) => (
            <SelectedKanjiCard
              kanji={card}
              id={index}
              key={index}
            ></SelectedKanjiCard>
          ))}
        </div>
        <h2 className={classes.filterTitle}>
          &nbsp; Number of Questions &nbsp;
        </h2>
        <div className={classes.numberOfQuestionsContainer}>
          <p className={classes.numberOfQuestionsLabel}> Number of Questions</p>
          <select
            className={classes.numberOfQuestionsDropDown}
            selected=""
            onChange={numberOfQuestionsHandler}
          >
            {arrayOfQuestionNumbers.map((value, index) => (
              <option key={index} value={value}>
                {value}
              </option>
            ))}
          </select>
        </div>
        {submitButtonEnabled && (
          <button
            className={classes.submitEnabledButton}
            onClick={sumbitButtonHandler}
          >
            Submit
          </button>
        )}
        {!submitButtonEnabled && (
          <button className={classes.submitDisabledButton}>Submit</button>
        )}
      </div>
    </dialog>
  );
};
export default NewQuizManualKanjiSelector;
