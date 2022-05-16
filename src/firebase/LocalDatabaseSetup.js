import { ref, child, get } from "firebase/database";
import exportObject from "./firebaseInitialization";
import store, { storeActions } from "../store/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./LocalDatabaseSetup.module.css";
import { useSelector } from "react-redux";
import gridData from "../pages/customKanji/dragNdropSection/gridData";

const LocalDatabaseSetup = () => {
  const databaseRef = ref(exportObject[0]);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();
  const [renderText, setRenderText] = useState();
  const kanjiCardsDB = useSelector((state) => state.kanjiCardsDB);

  useEffect(() => {
    const awaitDatabaseData = async () => {
      const grammarCardDB = await get(child(databaseRef, "GrammarCards/"));
      const kanjiCardDB = await get(child(databaseRef, "KanjiCards/"));
      const vocabCardDB = await get(child(databaseRef, "VocabCards/"));
      console.log(grammarCardDB);

      const takeDatabaseSnapshot = (snapShot, databaseType) => {
        try {
          if (snapShot.exists()) {
            const val = snapShot.val();
            const loadedCards = [];
            for (const key in val) {
              loadedCards.push({
                id: key,
                title: val[key].title,
                description: val[key].description,
                kanjiList: val[key].kanjiList,
                vocabData: val[key].vocabData,
                pdfId: val[key].pdfId,
              });
            }
            if (databaseType === "grammarCards") {
              dispatch(storeActions.setGrammarCardsDB(loadedCards));
            } else if (databaseType === "vocabCards") {
              dispatch(storeActions.setVocabCardsDB(loadedCards));
            } else if (databaseType === "kanjiCards") {
              let megaKanjiArray = {};
              for (let i = 0; i < loadedCards.length; i++) {
                let kanjiList = loadedCards[i].kanjiList;
                for (let q = 0; q < 10; q++) {
                  let keyVal = `kanji${q}`;
                  let kanji = kanjiList[keyVal].kanji;
                  megaKanjiArray[kanji] = {
                    kunyomi: [kanjiList[keyVal].kunyomi],
                    kunyomiEnglish: [kanjiList[keyVal].kunyomiEnglish],
                    meaning: [kanjiList[keyVal].meaning],
                    onyomiEnglish: [kanjiList[keyVal].onyomiEnglish],
                    onyomiKana: [kanjiList[keyVal].onyomiKana],
                    radical: [kanjiList[keyVal].radical],
                    strokes: [kanjiList[keyVal].strokes],
                    strokeSVGs: [kanjiList[keyVal].strokeSVGs],
                    kanji: [kanji],
                  };
                }
              }
              /// setting up Kanji with JLPT TestLevel
              let tempArray = [];
              for (let i = 0; i < loadedCards.length; i++) {
                if (typeof loadedCards[i].kanjiList == "undefined") {
                } else {
                  let currentCard = loadedCards[i].kanjiList;

                  for (let j = 0; j < 10; j++) {
                    if (typeof currentCard[`kanji${j}`] != "undefined") {
                      if (j === 10) {
                        let newObject = {
                          kanji: currentCard[`kanji91`].kanji,
                          strokes: currentCard[`kanji91`].strokes,
                          jlptLevel: loadedCards[i].title,
                        };
                        tempArray.push(newObject);
                      } else {
                        let newObject = {
                          kanji: currentCard[`kanji${j}`].kanji,
                          strokes: currentCard[`kanji${j}`].strokes,
                          jlptLevel: loadedCards[i].title,
                        };
                        tempArray.push(newObject);
                      }
                    } else {
                      break;
                    }
                  }
                }
              }

              dispatch(storeActions.setKanjiWithJLPTTestLevel(tempArray));
              dispatch(storeActions.setKanjiDatabase(megaKanjiArray));
              dispatch(storeActions.setKanjiCardsDB(loadedCards));
              dispatch(storeActions.setCustomKanjiGridData(gridData));
              dispatch(storeActions.setDatabaseLoaded(true));
              setIsLoading(false);
            }
          } else {
          }
        } catch (error) {
          setIsLoading(false);
          setHttpError(error.message);
        }
      };
      takeDatabaseSnapshot(grammarCardDB, "grammarCards");
      takeDatabaseSnapshot(vocabCardDB, "vocabCards");
      takeDatabaseSnapshot(kanjiCardDB, "kanjiCards");
    };
    awaitDatabaseData();
  }, [dispatch, databaseRef]);
  useDispatch(() => {
    if (kanjiCardsDB.length !== 0) {
      setRenderText(null);
    }
    if (isLoading) {
      setRenderText("Loading...");
    }
    if (httpError) {
      setRenderText(httpError);
    }
  }, [kanjiCardsDB]);

  return (
    <section
      className={
        renderText === "Loading..."
          ? classes.flashcardsLoading
          : classes.flashcardsFinishedLoading
      }
    >
      <p className={classes.text}>{renderText}</p>
    </section>
  );
};
export default LocalDatabaseSetup;
