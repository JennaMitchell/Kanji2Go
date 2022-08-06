import classes from "./quizKanjiSelectorCard.module.css";
import { PlusIcon, MinusIcon } from "@heroicons/react/solid";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { storeActions } from "../../../store/store";
const QuizKanjiSelectorCard = ({ kanji, id }) => {
  const [selectorClicked, setSelectorClicked] = useState(false);
  
  const dispatch = useDispatch();
  const selectorHandler = () => {
    dispatch(storeActions.setQuizKanjiClickedId(id));
  };

  const quizKanjiClickedId = useSelector((state) => state.quizKanjiClickedId);
  useEffect(() => {
    if (quizKanjiClickedId !== -1) {
      if (id === quizKanjiClickedId) {
        if (selectorClicked) {
          setSelectorClicked(false);
          dispatch(storeActions.setQuizKanjiClickedId(-1));
          //line above is used to trigger the useEffect
          dispatch(storeActions.setKanjiClicked(false));
        } else {
          setSelectorClicked(true);
          dispatch(storeActions.setQuizKanjiClickedId(-1));
          //line above is used to trigger the useEffect
          dispatch(storeActions.setQuizKanjiClicked(kanji));
        }
      } else {
        if (selectorClicked === true) {
          setSelectorClicked(false);
        }
      }
    }
  }, [quizKanjiClickedId]);

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
export default QuizKanjiSelectorCard;
