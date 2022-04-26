import NavBar from "../../nav/navBar";
import Footer from "../../components/footer";
import PageMenu from "../../main/pageMenu";
import ShopMenu from "../../main/shopMenu";
import LoginPopup from "../../login/loginPopup";
import classes from "./kanjiQuizMainPage.module.css";
import { useSelector } from "react-redux";

const KanjiQuizMainPage = () => {
  const pageButtonClicked = useSelector((state) => state.pageButtonClicked);
  const shopNavButtonClicked = useSelector(
    (state) => state.shopNavButtonClicked
  );
  const loginButtonClicked = useSelector((state) => state.loginButtonClicked);
  return (
    <div className={classes.mainContainer}>
      <NavBar />
      <div className={classes.titleContainer}>
        {pageButtonClicked ? <PageMenu /> : ""}
        {shopNavButtonClicked ? <ShopMenu /> : ""}
        {loginButtonClicked ? <LoginPopup /> : ""}
        <h3 className={classes.titleHeading}>Kanji Quiz</h3>
      </div>
      <div className={classes.quizContainer}> </div>
      <Footer />
    </div>
  );
};
export default KanjiQuizMainPage;
