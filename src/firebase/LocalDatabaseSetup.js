import { ref, child, get } from "firebase/database";
import databaseTest from "./firebaseInitialization";
import { storeActions } from "../store/store";
import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import classes from "./LocalDatabaseSetup.module.css";

const LocalDatabaseSetup = () => {
  const databaseRef = ref(databaseTest);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(true);
  const [httpError, setHttpError] = useState();

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
  if (isLoading) {
    return (
      <section className={classes.flashcardsLoading}>
        <p>Loading...</p>
      </section>
    );
  }
  if (httpError) {
    return (
      <section className={classes.httpRequestError}>
        <p>{httpError}</p>
      </section>
    );
  }
  return null;
};
export default LocalDatabaseSetup;
