import classes from "./kanjiSelectorCard.module.css";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../store/store";
const KanjiSelectorCard = ({ kanji, id }) => {
  const [selectorClicked, setSelectorClicked] = useState(false);
  const savedId = id;
  const savedKanji = kanji;
  const dispatch = useDispatch();
  const selectorHandler = () => {
    dispatch(storeActions.setCustomKanjiSelectorClickedId(id));
  };

  const customKanjiSelectorClickedId = useSelector(
    (state) => state.customKanjiSelectorClickedId
  );
  useEffect(() => {
    if (customKanjiSelectorClickedId !== -1) {
      if (savedId === customKanjiSelectorClickedId) {
        if (selectorClicked) {
          setSelectorClicked(false);
          dispatch(storeActions.setCustomKanjiSelectorClickedId(-1));
          // used to trigger the useEffect
          dispatch(storeActions.setKanjiClicked(false));
        } else {
          setSelectorClicked(true);
          dispatch(storeActions.setCustomKanjiSelectorClickedId(-1));
          // used to trigger the useEffect

          dispatch(storeActions.setKanjiClicked(savedKanji));
        }
      } else {
        if (selectorClicked === true) {
          setSelectorClicked(false);
        }
      }
    }
  }, [customKanjiSelectorClickedId]);

  return (
    <div
      className={`${classes.selectorContainer} ${
        selectorClicked && classes.activeContainer
      }`}
      onClick={selectorHandler}
    >
      <h2 className={classes.kanji}>{kanji}</h2>
      <button className={classes.icon}>
        {selectorClicked ? <MinusIcon></MinusIcon> : <PlusIcon></PlusIcon>}
      </button>
    </div>
  );
};
export default KanjiSelectorCard;
