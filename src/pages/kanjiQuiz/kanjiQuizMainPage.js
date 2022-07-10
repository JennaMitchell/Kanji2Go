import NavBar from "../../nav/navBar";
import Footer from "../../components/footer";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import classes from "./kanjiQuizMainPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import NewQuizAllOrManualPopup from "./quizPopup/newQuizAllOrManualPopup";
import NewQuizManualKanjiSelector from "./quizPopup/newQuizManualKanjiSelector";
import NewQuizJLPTKanjiSelector from "./quizPopup/newQuizJLPTKanjiSelector";
import QuizCanvas from "./quizCanvas";
import QuestionWindow from "./questionWindow";
import QuestionsMenu from "./questionsMenu";
import ScoreQuizWindow from "./scoreQuizWindow";
import { storeActions } from "../../store/store";

const KanjiQuizMainPage = () => {
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [newQuizType, setNewQuizType] = useState("");
  const [selectedKanji, setSelectedKanji] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const [questionsMenuClicked, setQuestionsMenuClicked] = useState(false);
  const [scoreQuizButtonClicked, setScoreQuizButtonClicked] = useState(false);
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const activeQuizQuestionNumber = useSelector(
    (state) => state.activeQuizQuestionNumber
  );
  const activeQuizQuestionChanged = useSelector(
    (state) => state.activeQuizQuestionChanged
  );
  const [activeNumber, setActiveNumber] = useState(0);
  const allQuizQuestionsAnswered = useSelector(
    (state) => state.allQuizQuestionsAnswered
  );
  const [allQuestionsAnswered, setAllQuestionsAnswered] = useState(false);
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const dispatch = useDispatch();

  //used to check if all questions answered
  useEffect(() => {
    if (allQuizQuestionsAnswered) {
      setAllQuestionsAnswered(true);
    }
  }, [allQuizQuestionsAnswered]);

  useEffect(() => {
    setActiveNumber(activeQuizQuestionNumber);
  }, [activeQuizQuestionChanged]);

  useEffect(() => {
    if (newQuizType === "JLPT Test") {
      setJlptDialogOpen(true);
    } else if (newQuizType === "Manual") {
      setManualDialogOpen(true);
    }
  }, [newQuizType]);

  // These two are used for the intial new Quiz
  const newTestButtonHandler = () => {
    setNewPageOpen(!newPageOpen);
    dispatch(storeActions.setActiveQuizQuestionNumber(1));
    dispatch(storeActions.setSavedQuizImageArray([]));
    dispatch(storeActions.setAllQuizQuestionsAnswered(false));
  };
  const retrieveQuizType = (type) => {
    setNewQuizType(type);
  };
  // Handling JLPT Test Dialog Box
  const retreiveKanjiSelected = (data, numberOfQuestions) => {
    setSelectedKanji(data);
    setNumberOfQuestions(numberOfQuestions);
  };
  const [jlptDialogOpen, setJlptDialogOpen] = useState(false);
  const closeJlptDialogHandler = () => {
    setJlptDialogOpen(false);
    setNewQuizType("");
    // used to reset the useEffect
  };

  const [manualDialogOpen, setManualDialogOpen] = useState(false);
  const closeManualDialogOpen = () => {
    setManualDialogOpen(false);
    setNewQuizType("");
  };
  let questionsButtonActivator = false;
  if (selectedKanji.length !== 0) {
    questionsButtonActivator = true;
  }

  const questionMenuHandler = () => {
    if (!questionsButtonActivator) {
      return;
    }
    setQuestionsMenuClicked(!questionsMenuClicked);
  };

  const scoreQuizHandler = () => {
    if (!allQuestionsAnswered) {
      return;
    }
    setScoreQuizButtonClicked(!scoreQuizButtonClicked);
   
  };

  return (
    <div
      className={`${newPageOpen && classes.overflowHidden} ${
        manualDialogOpen && classes.overflowHidden
      } ${jlptDialogOpen && classes.overflowHidden}  ${classes.mainContainer}`}
    >
      <NewQuizAllOrManualPopup
        newTestPageOpen={newPageOpen}
        onCloseFunction={newTestButtonHandler}
        retrieveQuizType={retrieveQuizType}
      ></NewQuizAllOrManualPopup>
      <NavBar />
      {newQuizType === "Manual" && (
        <NewQuizManualKanjiSelector
          retreiveKanjiSelectedFunction={retreiveKanjiSelected}
          manualDialogOpen={manualDialogOpen}
          onCloseFunction={closeManualDialogOpen}
        ></NewQuizManualKanjiSelector>
      )}
      {newQuizType === "JLPT Test" && (
        <NewQuizJLPTKanjiSelector
          retreiveKanjiSelectedFunction={retreiveKanjiSelected}
          jlptDialogOpen={jlptDialogOpen}
          onCloseFunction={closeJlptDialogHandler}
        ></NewQuizJLPTKanjiSelector>
      )}
      <div className={classes.titleContainer}>
        {pageButtonClicked ? <PageMenu /> : ""}
        {shopNavButtonClicked ? <ShopMenu /> : ""}
        {loginButtonClicked ? <LoginPopup /> : ""}
        <h3 className={classes.titleHeading}>Kanji Quiz</h3>
      </div>
      <div className={classes.quizContainer}>
        <button
          className={classes.newTestButton}
          onClick={newTestButtonHandler}
        >
          New Quiz
        </button>
        <button
          className={
            allQuestionsAnswered
              ? `${classes.scoreTestButtonActive} ${classes.scoreTestButton}`
              : `${classes.scoreTestButtonDisabled}`
          }
          onClick={scoreQuizHandler}
        >
          Score Quiz
        </button>
        <button
          className={
            questionsButtonActivator
              ? ` ${classes.questionMenu}`
              : `${classes.questionDisabledMenu}`
          }
          onClick={questionMenuHandler}
        >
          Questions
        </button>

        {questionsMenuClicked && (
          <QuestionsMenu
            numberOfQuestions={numberOfQuestions}
            activeQuizNumber={activeNumber}
          />
        )}

        <div
          className={
            scoreQuizButtonClicked
              ? `${classes.scoreWindowContainer}`
              : `${classes.quizWindowContainer}`
          }
        >
          <QuestionWindow
            selectedKanji={selectedKanji}
            activeQuestionNumber={activeQuizQuestionNumber}
          />

          {scoreQuizButtonClicked ? (
            <ScoreQuizWindow
              selectedKanji={selectedKanji}
              activeQuestionNumber={activeQuizQuestionNumber}
            />
          ) : (
            <div className={classes.quizCanvasBackdrop}>
              <QuizCanvas numberOfQuestions={numberOfQuestions} />
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default KanjiQuizMainPage;
