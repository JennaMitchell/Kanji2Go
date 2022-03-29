import "./App.css";
import NavBar from "./nav/navBar";
import HomePage from "./main/homepage";
import "./theme/style.css";
import { Route, Routes, Navigate } from "react-router-dom";
import AboutUsPage from "./pages/aboutUsPage";
import PreMadeKanjiSheets from "./pages/PremadeSheets/premadeKanjiSheet";
import LocalDatabaseSetup from "./firebase/LocalDatabaseSetup";
import CustomKanjiHomePage from "./pages/customKanji/customKanjiHomePage";

function App() {
  return (
    <>
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
          path="/premadeKanjiSheets"
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
      </Routes>
    </>
  );
}

export default App;
