import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classes from "./kanjiPreviewSide.module.css";
import { storeActions } from "../../store/store";
import KanjiPreviewSideDataBox from "./kanjiPreviewSideDataBox";

const KanjiPreviewSide = ({ kanji, card, id }) => {
  const dispatch = useDispatch();
  const [kanjiClicked, setKanjiClicked] = useState(false);
  const [savedId, setSavedId] = useState(id);
  const [savedKanjiData, setSavedKanjiData] = useState(card);
  const [firstRender, setFirstRender] = useState(false);
  const kanjiClickedId = useSelector((state) => state.kanjiClickedId);

  useEffect(() => {
    if (firstRender) {
      setSavedKanjiData(true);
    } else {
      if (savedId !== kanjiClickedId) {
        setKanjiClicked(false);
      }
    }
  }, [kanjiClickedId]);

  const kanjiButtonHandler = () => {
    if (kanjiClicked) {
      setKanjiClicked(false);
      dispatch(storeActions.setActivePreviewKanjiData([]));
      dispatch(storeActions.setKanjiIdClicked(false));
    } else {
      setKanjiClicked(true);
      dispatch(storeActions.setActivePreviewKanjiData(savedKanjiData));
      dispatch(storeActions.setKanjiIdClicked(savedId));
    }
  };

  return (
    <>
      <button
        onClick={kanjiButtonHandler}
        className={`${classes.kanjiSelection} ${
          kanjiClicked && classes.kanjiClicked
        }`}
      >
        {kanji}
      </button>
      {kanjiClicked && <KanjiPreviewSideDataBox card={savedKanjiData} />}
    </>
  );
};
export default KanjiPreviewSide;
