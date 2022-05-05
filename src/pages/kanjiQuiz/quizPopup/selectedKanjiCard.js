import classes from "./selectedKanjiCard.module.css";
import { TrashIcon } from "@heroicons/react/solid";

import { useDispatch } from "react-redux";
import { storeActions } from "../../../store/store";
const SelectedKanjiCard = ({ kanji, id }) => {
  const dispatch = useDispatch();
  const selectorHandler = () => {
    dispatch(storeActions.setDeleteSelectedKanji(kanji));
  };

  return (
    <div className={`${classes.selectorContainer}`} onClick={selectorHandler}>
      <h2 className={classes.kanji}>{kanji}</h2>
      <button className={classes.icon}>
        <TrashIcon />
      </button>
    </div>
  );
};
export default SelectedKanjiCard;
