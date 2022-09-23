import classes from "./App.css";
import HomePage from "./main/homepage";
import "./theme/style.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AboutUsPage from "./pages/aboutUsPage";
import PreMadeKanjiSheets from "./pages/PremadeSheets/premadeKanjiSheet";
import LocalDatabaseSetup from "./firebase/LocalDatabaseSetup";
import CustomKanjiHomePage from "./pages/customKanji/customKanjiHomePage";
import KanjiQuizMainPage from "./pages/kanjiQuiz/kanjiQuizMainPage";
import SentencePracticeMainPage from "./pages/sentencePractice/sentencePracticeMainPage";
import Credits from "./credits/credits";

function App() {
  return (
    <div className={classes.appContainer}>
      <LocalDatabaseSetup />
      <Routes>
        <Route path="/" element={<Navigate replace to="/home" />} />
        <Route
          path="/home"
          element={
            <>
              <HomePage />
            </>
          }
        />

        <Route
          path="/aboutus"
          element={
            <>
              <AboutUsPage />
            </>
          }
        />
        <Route
          path="/premadeKanjiSheets"
          element={
            <>
              <PreMadeKanjiSheets />
            </>
          }
        />
        <Route
          path="/customKanjiSheets"
          element={
            <>
              <CustomKanjiHomePage />
            </>
          }
        />
        <Route
          path="/kanjiQuiz"
          element={
            <>
              <KanjiQuizMainPage />
            </>
          }
        />
        <Route
          path="/sentencePractice"
          element={
            <>
              <SentencePracticeMainPage />
            </>
          }
        />
        <Route
          path="/credits"
          element={
            <>
              <Credits />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
