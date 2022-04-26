import classes from "./addComponentMenu.module.css";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../store/store";

const AddComponentMenu = () => {
  //setCustomKanjiGridData
  const customKanjiGridData = useSelector((state) => state.customKanjiGridData);

  const dispatch = useDispatch();
  const kanjiBtnHandler = () => {
    dispatch(storeActions.setAddKanjiMenu(true));
  };

  const blankSquareHandler = () => {
    dispatch(storeActions.setBlankSquareMenu(true));
  };
  const newPageHandler = () => {
    let tempArray = JSON.parse(JSON.stringify(customKanjiGridData));

    const lastColumnIndex = tempArray.columnOrder.length;
    for (let i = 0; i < 14; i++) {
      tempArray.columnOrder[lastColumnIndex + i] = `column-${
        lastColumnIndex + i + 1
      }`;
      tempArray.columns[`column-${lastColumnIndex + i + 1}`] = {
        id: `column-${lastColumnIndex + i + 1}`,
        idContainer: [],
        numberOfItems: 0,
      };
    }

    dispatch(storeActions.setCustomKanjiGridData(tempArray));
    dispatch(storeActions.setNewPageClicked(true));
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
      <button
        className={`${classes.newPageButton} ${classes.btn}`}
        onClick={newPageHandler}
      >
        New Page
      </button>
    </div>
  );
};
export default AddComponentMenu;
