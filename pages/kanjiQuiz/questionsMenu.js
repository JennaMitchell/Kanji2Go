import classes from "./questionsMenu.module.css";
import { CheckIcon } from "@heroicons/react/solid";
import { storeActions } from "../../store/store";
import { useDispatch, useSelector } from "react-redux";
const QuestionsMenu = ({ numberOfQuestions, activeQuizNumber }) => {
  const savedQuizImageArray = useSelector((state) => state.savedQuizImageArray);
  const arrayOfQuestionTitles = [];
  const dispatch = useDispatch();
  const activeQuizQuestionChanged = useSelector(
    (state) => state.activeQuizQuestionChanged
  );
  const questionClickHandler = (e) => {
    let text = e.target.firstChild.wholeText;
    if (typeof text === "string") {
      let indexOfFirstSpace = text.indexOf(" ");
      let questionNumberClicked = +text.slice(indexOfFirstSpace);
      if (
        typeof questionNumberClicked === "number" &&
        questionNumberClicked > 0
      ) {
        dispatch(
          storeActions.setActiveQuizQuestionNumber(questionNumberClicked)
        );
        dispatch(
          storeActions.setActiveQuizQuestionChanged(!activeQuizQuestionChanged)
        );
      }
    }
  };

  for (let i = 0; i < numberOfQuestions; i++) {
    let activeQuestion = false;
    let answeredQuestion = false;
    if (numberOfQuestions === 0) {
      break;
    }
    if (activeQuizNumber === i + 1) {
      activeQuestion = true;
    }
    if (savedQuizImageArray[i] !== undefined) {
      answeredQuestion = true;
    }
    arrayOfQuestionTitles[i] = (
      <div
        className={
          activeQuestion
            ? `${classes.activeQuestion} ${classes.questionContainer}`
            : `${classes.questionContainer}`
        }
        key={i}
      >
        <h3 className={classes.questionTitle} onClick={questionClickHandler}>
          Question {i + 1}
        </h3>
        <div className={classes.checkMarkContainer}>
          {answeredQuestion && <CheckIcon className={classes.icon} />}
        </div>
      </div>
    );
  }
  return <div className={classes.mainContainer}>{arrayOfQuestionTitles}</div>;
};
export default QuestionsMenu;
