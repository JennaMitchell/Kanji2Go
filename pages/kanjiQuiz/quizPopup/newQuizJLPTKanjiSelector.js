import { useRef, useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import classes from "./newQuizJLPTKanjiSelector.module.css";
import { XIcon } from "@heroicons/react/solid";
const NewQuizJLPTKanjiSelector = ({
  retreiveKanjiSelectedFunction,
  jlptDialogOpen,
  onCloseFunction,
}) => {
  const preventAutoClose = (e) => e.stopPropagation();
  // prevents the window from closing when the use clicks on the dialog box
  const [jlptTestLevel, setJlptTestLevel] = useState();
  const [numberOfQuestionsSelected, setNumberOfQuestionsSelected] = useState();
  const [firstEnabler, setFirstEnabler] = useState(false);
  const [secondEnabler, setSecondEnabler] = useState(false);
  const [submitButtonEnabled, setSubmitButtonEnabled] = useState(false);
  const kanjiWithJLPTTestLevel = useSelector(
    (state) => state.kanjiWithJLPTTestLevel
  );
  const [filteredKanji, setFilteredKanji] = useState(
    kanjiWithJLPTTestLevel.slice()
  );
  const ref = useRef(null);

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

  const submitButtonHandler = () => {
    let finalSelectedKanji = [];
    if (numberOfQuestionsSelected !== 0) {
      finalSelectedKanji = selectingRandomNumberOfKanji(
        filteredKanji,
        numberOfQuestionsSelected
      );
    }
    console.log(finalSelectedKanji);
    retreiveKanjiSelectedFunction(
      finalSelectedKanji,
      numberOfQuestionsSelected
    );
    onCloseFunction();
  };

  useEffect(() => {
    if (jlptDialogOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [jlptDialogOpen]);
  const arrayOfJLPTTests = ["JLPT5", "JLPT4", "JLPT3", "JLPT2", "JLPT1", "All"];
  const dropDownJLPTHandler = (e) => {
    if (typeof e.target.value === "string" && e.target.value.length <= 5) {
      setJlptTestLevel(e.target.value);
    } else if (e.target.value === "All") {
      setJlptTestLevel(e.target.value);
    }
  };

  useEffect(() => {
    let tempArray = kanjiWithJLPTTestLevel.slice();
    switch (jlptTestLevel) {
      case "JLPT5":
        tempArray = tempArray.filter((card) => card.jlptLevel === "JLPT5");
        setFilteredKanji(tempArray);
        break;
      case "JLPT4":
        tempArray = tempArray.filter((card) => card.jlptLevel === "JLPT4");
        setFilteredKanji(tempArray);
        break;
      case "JLPT3":
        tempArray = tempArray.filter((card) => card.jlptLevel === "JLPT3");
        setFilteredKanji(tempArray);
        break;
      case "JLPT2":
        tempArray = tempArray.filter((card) => card.jlptLevel === "JLPT2");
        setFilteredKanji(tempArray);
        break;
      case "JLPT1":
        tempArray = tempArray.filter((card) => card.jlptLevel === "JLPT1");
        setFilteredKanji(tempArray);
        break;
      case "All":
        tempArray = kanjiWithJLPTTestLevel.slice();
        setFilteredKanji(tempArray);
        break;
      default:
        break;
    }
    if (tempArray.length !== 0) {
      setFirstEnabler(true);
    } else {
      setFirstEnabler(false);
    }
    if (tempArray.length !== 0 && secondEnabler) {
      setSubmitButtonEnabled(true);
    } else {
      setSubmitButtonEnabled(false);
    }
  }, [jlptTestLevel]);
  let numberOfQuestionsArray = [];
  for (let i = 0; i < filteredKanji.length; i++) {
    numberOfQuestionsArray[i] = i + 1;
  }
  if (numberOfQuestionsArray.length !== 0) {
    numberOfQuestionsArray.unshift("");
  }
  //  useEffect(()=>{},[num])
  const numberOfQuestionsHandler = (e) => {
    if (e.target.value > 0) {
      setNumberOfQuestionsSelected(e.target.value);
      setSecondEnabler(true);
    } else {
      setSecondEnabler(false);
    }
    if (e.target.value > 0 && firstEnabler) {
      setSubmitButtonEnabled(true);
    } else {
      setSubmitButtonEnabled(false);
    }
  };

  return (
    <dialog ref={ref} className={classes.dialogBox} onClick={preventAutoClose}>
      <div className={classes.mainContainer}>
        <div className={classes.iconContainer} onClick={onCloseFunction}>
          <XIcon className={classes.icon} />
        </div>
        <h2 className={classes.title}> &nbsp;Select a JLPT Level&nbsp;</h2>
        <div className={classes.jlptTestSelectorContainer}>
          <p className={classes.jlptTestLabel}>JLPT Test Level</p>
          <select
            name="JLPT Level"
            id="JLPTLevel"
            className={classes.testDropDownMenu}
            onChange={dropDownJLPTHandler}
          >
            {arrayOfJLPTTests.map((test, index) => (
              <option key={index} value={test}>
                {test}
              </option>
            ))}
          </select>
        </div>
        <div className={classes.numberOfQuestionsSelectorContainer}>
          <p className={classes.numberOfQuestionsLabel}>Number of Questions</p>
          <select
            className={classes.numberOfQuestionsDropDown}
            onChange={numberOfQuestionsHandler}
            selected={""}
          >
            {numberOfQuestionsArray.map((num, index) => (
              <option key={index} value={num}>
                {num}
              </option>
            ))}
          </select>
        </div>
        {}
        <button
          className={
            submitButtonEnabled
              ? `${classes.activeSubmitButton}`
              : `${classes.submitButton}`
          }
          onClick={submitButtonHandler}
        >
          Submit
        </button>
      </div>
    </dialog>
  );
};
export default NewQuizJLPTKanjiSelector;
