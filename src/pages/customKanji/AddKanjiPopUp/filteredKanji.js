import { useSelector } from "react-redux";
import KanjiSelectorCard from "./kanjiSelectorCard";

const FilteredKanji = ({ testFilters, numberOfStrokes }) => {
  const kanjiWithJLPTTestLevel = useSelector(
    (state) => state.kanjiWithJLPTTestLevel
  );
  let sortableKanjiArray = kanjiWithJLPTTestLevel.slice();
  let sortedKanjiArray = [];

  if (typeof testFilters != "undefined" && testFilters.length !== 0) {
    sortedKanjiArray = sortableKanjiArray.filter((card) =>
      testFilters.includes(card.jlptLevel)
    );
  } else {
    sortedKanjiArray = sortableKanjiArray;
  }

  if (typeof numberOfStrokes != "undefined" && numberOfStrokes !== "All") {
    sortedKanjiArray = sortedKanjiArray.filter(
      (card) => card.strokes === +numberOfStrokes
    );
  }

  return (
    <>
      {sortedKanjiArray.map((card, index) => (
        <KanjiSelectorCard
          kanji={card.kanji}
          id={index}
          key={index}
        ></KanjiSelectorCard>
      ))}
    </>
  );
};
export default FilteredKanji;
