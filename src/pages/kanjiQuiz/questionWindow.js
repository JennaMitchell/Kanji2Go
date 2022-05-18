import { useSelector } from "react-redux";
import classes from "./questionWindow.module.css";
import { ChevronRightIcon, ChevronLeftIcon } from "@heroicons/react/solid";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";

const QuestionWindow = ({ selectedKanji, activeQuestionNumber }) => {
  const kanjiDatabase = useSelector((state) => state.kanjiDatabase);

  const dispatch = useDispatch();

  const activeQuizQuestionChanged = useSelector(
    (state) => state.activeQuizQuestionChanged
  );
  const previousButtonHandler = () => {
    let tempVar = 1;
    if (activeQuestionNumber === 1) {
      tempVar = selectedKanji.length;
    } else {
      tempVar = activeQuestionNumber - 1;
    }
    dispatch(storeActions.setActiveQuizQuestionNumber(tempVar));
    dispatch(
      storeActions.setActiveQuizQuestionChanged(!activeQuizQuestionChanged)
    );
  };
  const nextButtonHandler = () => {
    let tempVar = 1;
    if (activeQuestionNumber !== selectedKanji.length) {
      tempVar = activeQuestionNumber + 1;
    }
    dispatch(storeActions.setActiveQuizQuestionNumber(tempVar));
    dispatch(
      storeActions.setActiveQuizQuestionChanged(!activeQuizQuestionChanged)
    );
  };
  let currentQuestionData = {
    meaning: "",
    kunyomi: "",
    onyomiKana: "",
    onyomiEnglish: "",
    kunyomiEnglish: "",
  };
  if (selectedKanji.length !== 0) {
    currentQuestionData =
      kanjiDatabase[selectedKanji[activeQuestionNumber - 1].kanji];
  }
  return (
    <div className={classes.questionContainer}>
      <button
        className={classes.previousButton}
        onClick={previousButtonHandler}
      >
        <ChevronLeftIcon className={classes.prevIcon} />
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
        <ChevronRightIcon className={classes.nextIcon} />
      </button>
    </div>
  );
};
export default QuestionWindow;
