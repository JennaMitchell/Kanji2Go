import { ref, child, get } from "firebase/database";
import databaseTest from "./firebaseInitialization";
import { storeActions } from "../store/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./LocalDatabaseSetup.module.css";
import { useSelector } from "react-redux";

const LocalDatabaseSetup = () => {
  const databaseRef = ref(databaseTest);
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
              });
            }
            if (databaseType === "grammarCards") {
              dispatch(storeActions.setGrammarCardsDB(loadedCards));
            } else if (databaseType === "vocabCards") {
              dispatch(storeActions.setVocabCardsDB(loadedCards));
            } else if (databaseType === "kanjiCards") {
              dispatch(storeActions.setKanjiCardsDB(loadedCards));
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
      takeDatabaseSnapshot(kanjiCardDB, "kanjiCards");
      takeDatabaseSnapshot(vocabCardDB, "vocabCards");
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
    <section className={classes.flashcardsLoading}>
      <p>{renderText}</p>
    </section>
  );
};
export default LocalDatabaseSetup;
