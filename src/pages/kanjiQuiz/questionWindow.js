import { useSelector } from "react-redux";
import classes from "./questionWindow.module.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useState } from "react";

const QuestionWindow = ({ selectedKanji, numberOfQuestions }) => {
  const kanjiDatabase = useSelector((state) => state.kanjiDatabase);

  const [currentQuestionNumber, setCurrentQuestionNumber] = useState(0);

  const previousButtonHandler = () => {
    if (currentQuestionNumber === 0) {
      setCurrentQuestionNumber(selectedKanji.length - 1);
    } else {
      setCurrentQuestionNumber(currentQuestionNumber - 1);
    }
  };
  const nextButtonHandler = () => {
    if (currentQuestionNumber === selectedKanji.length - 1) {
      setCurrentQuestionNumber(0);
    } else {
      setCurrentQuestionNumber(currentQuestionNumber + 1);
    }
  };

  let currentQuestionData = kanjiDatabase[selectedKanji[currentQuestionNumber]];

  return (
    <div className={classes.questionContainer}>
      <button
        className={classes.previousButton}
        onClick={previousButtonHandler}
      >
        <ChevronLeftIcon className={classes.icon} />
      </button>
      <div className={classes.kunyomiContainer}>
        <h3 className={classes.kunyomiTitle}>Kunyomi</h3>
        <p className={classes.kunyomiJapanenseText}>
          {currentQuestionData.kunyomi}
        </p>
        <p className={classes.kunyomiEnglishText}>
          {currentQuestionData.kunyomiEnglish}
        </p>
      </div>
      <div className={classes.onyomiContianer}>
        <h3 className={classes.onyomiTitle}>Onyomi</h3>
        <p className={classes.onyomiJapanenseText}>
          {currentQuestionData.onyomiKana}
        </p>
        <p className={classes.onyomiEnglish}>
          {currentQuestionData.onyomiEnglish}
        </p>
      </div>
      <div className={classes.meaningContianer}>
        <h3 className={classes.meaningTitle}>Meaning(s)</h3>
        <p className={classes.meaningText}>{currentQuestionData.meaning}</p>
      </div>
      <div className={classes.strokesTab}></div>
      <button className={classes.nextButton} onClick={nextButtonHandler}>
        <ChevronRightIcon className={classes.icon} />
      </button>
    </div>
  );
};
export default QuestionWindow;
