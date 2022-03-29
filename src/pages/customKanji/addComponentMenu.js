import classes from "./addComponentMenu.module.css";
import { useDispatch } from "react-redux";
import { storeActions } from "../../store/store";

import { useState } from "react";

const AddComponentMenu = () => {
  const dispatch = useDispatch();
  const kanjiBtnHandler = () => {
    dispatch(storeActions.setAddKanjiMenu(true));
  };

  const blankSquareHandler = () => {
    dispatch(storeActions.setBlankSquareMenu(true));
  };

  return (
    <div className={classes.addingMenu}>
      <button
        className={`${classes.kanjiButton} ${classes.btn}`}
        onClick={kanjiBtnHandler}
      >
        Kanji
      </button>
      <button
        className={`${classes.blanksButton} ${classes.btn}`}
        onClick={blankSquareHandler}
      >
        Blank Squares
      </button>
      <button className={`${classes.newPageButton} ${classes.btn}`}>
        New Page
      </button>
    </div>
  );
};
export default AddComponentMenu;
