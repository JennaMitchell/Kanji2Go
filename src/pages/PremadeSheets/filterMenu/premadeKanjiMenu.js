import classes from "./premadeKanjiMenu.module.css";
import JLPTTestFilter from "./menuSections/jlptTestFilter";
import TypeFilter from "./menuSections/typeFilter";
import { useSelector } from "react-redux";

const PremadeKanjiFilterMenu = ({ menuButtonClicked }) => {
  return (
    <>
      <div
        className={`${classes.menuContainer} ${
          menuButtonClicked && classes.menuContainerMoveOut
        }`}
      >
        <h2 className={classes.subTitle}>&#160; Filters &#160;</h2>
        <JLPTTestFilter />
        <TypeFilter />
      </div>
    </>
  );
};

export default PremadeKanjiFilterMenu;
