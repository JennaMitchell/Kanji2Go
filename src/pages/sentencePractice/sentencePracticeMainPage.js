import classes from "./sentencePracticeMainPage.module.css";
import NavBar from "../../nav/navBar";
import Footer from "../../components/footer";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import { useSelector } from "react-redux";
import { useState } from "react";
import NewSentencePracticePopup from "./sentencePracticePopups/newSentencePracticePopup";

const SentencePracticeMainPage = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  const [newTestPopupActive, setNewTestPopupActive] = useState(false);

  const newTestButtonHandler = () => {
    setNewTestPopupActive(!newTestPopupActive);
  };

  return (
    <div className={classes.mainContainer}>
      <NavBar />
      <div className={classes.titleContainer}>
        {pageButtonClicked ? <PageMenu /> : ""}
        {shopNavButtonClicked ? <ShopMenu /> : ""}
        {loginButtonClicked ? <LoginPopup /> : ""}
        <h3 className={classes.titleHeading}>Sentence Practice</h3>
      </div>
      <div className={classes.sentenceContainer}>
        <NewSentencePracticePopup
          newTestPageOpen={newTestPopupActive}
          onCloseFunction={newTestButtonHandler}
        />

        <button
          className={classes.newPracticeButton}
          onClick={newTestButtonHandler}
        >
          New Test
        </button>

        <div className={classes.promptWindow}></div>
      </div>
      <Footer />
    </div>
  );
};
export default SentencePracticeMainPage;
