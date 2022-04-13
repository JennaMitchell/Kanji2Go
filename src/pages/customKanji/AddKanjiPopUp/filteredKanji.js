import { useSelector } from "react-redux";
import KanjiSelectorCard from "./kanjiSelectorCard";

const FilteredKanji = ({ testFilters, numberOfStrokes }) => {
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);
  let sortableKanjiArray = [];
  let sortedKanjiArray = [];
  for (let i = 0; i < kanjiCardsDB.length; i++) {
    if (typeof kanjiCardsDB[i].kanjiList == "undefined") {
    } else {
      let currentCard = kanjiCardsDB[i].kanjiList;

      for (let j = 0; j < 10; j++) {
        if (typeof currentCard[`kanji${j}`] != "undefined") {
          if (j === 10) {
            console.log("J ==10");
            let newObject = {
              kanji: currentCard[`kanji91`].kanji,
              strokes: currentCard[`kanji91`].strokes,
              jlptLevel: kanjiCardsDB[i].title,
            };
            sortableKanjiArray.push(newObject);
          } else {
            let newObject = {
              kanji: currentCard[`kanji${j}`].kanji,
              strokes: currentCard[`kanji${j}`].strokes,
              jlptLevel: kanjiCardsDB[i].title,
            };
            sortableKanjiArray.push(newObject);
          }
        } else {
          break;
        }
      }
    }
  }

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
