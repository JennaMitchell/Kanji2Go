import NavBar from "../../nav/navBar";
import Footer from "../../components/footer";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import classes from "./kanjiQuizMainPage.module.css";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
// import NewTestPopup from "./quizPopup/newQuizPopup";
import NewQuizAllOrManualPopup from "./quizPopup/newQuizAllOrManualPopup";
import NewQuizManualKanjiSelector from "./quizPopup/newQuizManualKanjiSelector";
import NewQuizJLPTKanjiSelector from "./quizPopup/newQuizJLPTKanjiSelector";
import QuizCanvas from "./quizCanvas";
import QuestionWindow from "./questionWindow";
import { MenuIcon } from "@heroicons/react/solid";
const KanjiQuizMainPage = () => {
  const [newPageOpen, setNewPageOpen] = useState(false);
  const [newQuizType, setNewQuizType] = useState("");
  const [selectedKanji, setSelectedKanji] = useState("");
  const [numberOfQuestions, setNumberOfQuestions] = useState("");
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );

  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
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
  };
  const retrieveQuizType = (type) => {
    setNewQuizType(type);
  };
  // Handling JLPT Test Dialog Box
  const retreiveKanjiSelected = (data, numberOfQuestions) => {
    console.log(data, numberOfQuestions);
    setSelectedKanji(data);
    setNumberOfQuestions(numberOfQuestions);
  };
  const [jlptDialogOpen, setJlptDialogOpen] = useState(false);
  const closeJlptDialogHandler = () => {
    setJlptDialogOpen(!jlptDialogOpen);
  };

  const [manualDialogOpen, setManualDialogOpen] = useState(false);
  const closeManualDialogOpen = () => {
    setManualDialogOpen(!manualDialogOpen);
  };
  let tempData = ["五", "四", "三", "ニ", "一"];
  let tempNumberOfQuestions = 5;

  return (
    <div className={classes.mainContainer}>
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

        <button className={classes.scoreTestButton}>Score Quiz</button>
        <button className={classes.questionMenu}>
          <MenuIcon className={classes.icon} />
        </button>

        <div className={classes.quizWindowContainer}>
          <QuestionWindow
            selectedKanji={tempData}
            numberOfQuestions={tempNumberOfQuestions}
          />
          <div className={classes.quizCanvasBackdrop}>
            <QuizCanvas />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};
export default KanjiQuizMainPage;
