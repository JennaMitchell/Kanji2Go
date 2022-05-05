import classes from "./scoreQuizWindow.module.css";
import { useSelector } from "react-redux";
const ScoreQuizWindow = ({ activeQuestionNumber, selectedKanji }) => {
  const savedQuizImageArray = useSelector((state) => state.savedQuizImageArray);

  return (
    <div className={classes.mainContainer}>
      <div className={classes.answerContainer}>
        <h3 className={classes.responseTitle}>Correct Answer</h3>
        <p className={classes.kanjiText}>
          {selectedKanji[activeQuestionNumber - 1]}
        </p>
      </div>
      <div className={classes.responseContainer}>
        <h3 className={classes.responseTitle}>Your Response</h3>

        <img
          alt="User Response"
          src={savedQuizImageArray[activeQuestionNumber - 1]}
          className={classes.userImage}
        />
      </div>
    </div>
  );
};

export default ScoreQuizWindow;
