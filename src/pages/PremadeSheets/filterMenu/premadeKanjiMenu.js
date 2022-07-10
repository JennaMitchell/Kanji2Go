import classes from "./premadeKanjiMenu.module.css";
import JLPTTestFilter from "./menuSections/jlptTestFilter";
import TypeFilter from "./menuSections/typeFilter";
import { useSelector, useDispatch } from "react-redux";

import { ChevronLeftIcon } from "@heroicons/react/solid";
import { storeActions } from "../../../store/store";
const PremadeKanjiFilterMenu = () => {
  const dispatch = useDispatch();
  const returnButtonActive = window.matchMedia("(max-width: 510px)");
  const premadeKanjiMenuButtonClicked = useSelector(
    (state) => state.premadeKanjiMenuButtonClicked
  );
  const premadeKanjiFilterArray = useSelector(
    (state) => state.premadeKanjiFilterArray
  );
  const returnButtonHandler = () => {
    if (premadeKanjiFilterArray.length === 0) {
      dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
      dispatch(storeActions.setGrammarCardEnabler(true));
      dispatch(storeActions.setKanjiCardEnabler(true));
      dispatch(storeActions.setVocabCardEnabler(true));
    } else {
      dispatch(storeActions.setPremadeKanjiMenuButtonClicked(false));
    }
  };

  return (
    <>
      <div
        className={`${classes.menuContainer} ${
          premadeKanjiMenuButtonClicked && classes.menuContainerMoveOut
        }`}
      >
        {returnButtonActive && (
          <button
            className={classes.returnButton}
            onClick={returnButtonHandler}
          >
            <ChevronLeftIcon className={classes.returnIcon} />
          </button>
        )}
        <h2 className={classes.subTitle}>&#160; Filters &#160;</h2>
        <JLPTTestFilter />
        <TypeFilter />
      </div>
    </>
  );
};

export default PremadeKanjiFilterMenu;
