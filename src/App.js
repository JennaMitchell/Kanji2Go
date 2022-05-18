import classes from "./App.css";
import HomePage from "./main/homepage";
import "./theme/style.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AboutUsPage from "./pages/aboutUsPage";
import PreMadeKanjiSheets from "./pages/premadesheets/premadekanjisheet.js";
import LocalDatabaseSetup from "./firebase/LocalDatabaseSetup";
import CustomKanjiHomePage from "./pages/customKanji/customKanjiHomePage";
import KanjiQuizMainPage from "./pages/kanjiQuiz/kanjiQuizMainPage";
import SentencePracticeMainPage from "./pages/sentencePractice/sentencePracticeMainPage";

function App() {
  return (
    <div className={classes.appContainer}>
      <LocalDatabaseSetup></LocalDatabaseSetup>
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />}></Route>
        <Route
          path="/home"
          element={
            <>
              <HomePage />
            </>
          }
        ></Route>

        <Route
          path="/aboutus"
          element={
            <>
              <AboutUsPage />
            </>
          }
        ></Route>
        <Route
          path="/preMadeKanjiSheets"
          element={
            <>
              <PreMadeKanjiSheets />
            </>
          }
        ></Route>
        <Route
          path="/customKanjiSheets"
          element={
            <>
              <CustomKanjiHomePage />
            </>
          }
        ></Route>
        <Route
          path="/kanjiQuiz"
          element={
            <>
              <KanjiQuizMainPage />
            </>
          }
        ></Route>
        <Route
          path="/sentencePractice"
          element={
            <>
              <SentencePracticeMainPage />
            </>
          }
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
