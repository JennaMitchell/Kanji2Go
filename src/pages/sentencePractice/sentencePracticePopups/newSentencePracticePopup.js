import classes from "./newSentencePracticePopup.module.css";
import { useRef } from "react";
import { useEffect } from "react";
import { XIcon } from "@heroicons/react/solid";
import { useState } from "react";

const NewSentencePracticePopup = ({
  newTestPageOpen,
  onCloseFunction,
  returnDataFunction,
}) => {
  const preventAutoClose = (e) => e.stopPropagation();
  // prevents the window from closing when the use clicks on the dialog box
  const ref = useRef(null);
  const [numberOfQuestionsSelected, setNumberOfQuestionsSelected] =
    useState("");
  const [numberOfQuestionsEnabler, setNumberOfQuestionsEnabler] =
    useState(false);
  const [jlptTestLevelSelected, setJlptTestLevelSelected] = useState(false);
  const [jlptTestEnabler, setJlptTestEnabler] = useState(false);
  const [submitButtonActive, setSubmitButtonActive] = useState(false);
  const numberOfQuestionsHandler = (e) => {
    if (e.target.value > 0) {
      setNumberOfQuestionsSelected(e.target.value);
      setNumberOfQuestionsEnabler(true);
      if (jlptTestEnabler) {
        setSubmitButtonActive(true);
      }
    } else {
      setNumberOfQuestionsEnabler(false);
      if (submitButtonActive) {
        setSubmitButtonActive(false);
      }
    }
  };

  const jlptTestLevelHandler = (e) => {
    if (typeof e.target.value === "string" && e.target.value.includes("JLPT")) {
      setJlptTestLevelSelected(e.target.value);
      setJlptTestEnabler(true);
      if (numberOfQuestionsEnabler) {
        setSubmitButtonActive(true);
      }
    } else {
      setJlptTestEnabler(false);
      if (submitButtonActive) {
        setSubmitButtonActive(false);
      }
    }
  };

  const submitButtonHandler = () => {
    if (
      numberOfQuestionsSelected < 0 ||
      !jlptTestLevelSelected.includes("JLPT")
    ) {
      return;
    } else {
      returnDataFunction(numberOfQuestionsSelected, jlptTestLevelSelected);
      onCloseFunction();
    }
  };

  useEffect(() => {
    if (newTestPageOpen) {
      ref.current?.showModal();
    } else {
      ref.current?.close();
    }
  }, [newTestPageOpen]);
  let jlptLevelsArray = ["", "JLPT5", "JLPT4", "JLPT3", "JLPT2", "JLPT1"];
  jlptLevelsArray = jlptLevelsArray.map((level, index) => (
    <option key={index} value={level}>
      {level}
    </option>
  ));

  let numberOfQuestionsSelector = [];
  for (let i = 0; i < 5; i++) {
    numberOfQuestionsSelector[i] = i + 1;
  }
  numberOfQuestionsSelector.unshift("");
  numberOfQuestionsSelector = numberOfQuestionsSelector.map((num, index) => (
    <option key={index} value={num}>
      {num}
    </option>
  ));
  return (
    <dialog className={classes.dialogContainer} ref={ref}>
      <div className={classes.mainContainer} onClick={preventAutoClose}>
        <button
          className={classes.closingIconContainer}
          onClick={onCloseFunction}
        >
          <XIcon className={classes.icon} />
        </button>

        <h2 className={classes.mainTitle}>New Practice Setup</h2>
        <div className={classes.jlptTestSelectorContainer}>
          <h3 className={classes.jlptTestSelectorTitle}> JLPT Test Level</h3>
          <select
            className={classes.jlptLevelDropDown}
            onChange={jlptTestLevelHandler}
          >
            {jlptLevelsArray}
          </select>
        </div>
        <div className={classes.numberOfQuestionsContainer}>
          <h3 className={classes.numberOfQuestionsTitle}>
            Number of Questions
          </h3>
          <select
            className={classes.numberOfQuestionsDropDown}
            onChange={numberOfQuestionsHandler}
          >
            {numberOfQuestionsSelector}
          </select>
        </div>
        <button
          className={
            submitButtonActive
              ? `${classes.submitButtonActive} ${classes.submitButton}`
              : `${classes.submitButton} ${classes.submitButtonDisabled}`
          }
          onClick={submitButtonHandler}
        >
          Submit
        </button>
      </div>
    </dialog>
  );
};
export default NewSentencePracticePopup;
