import { ref, child, get } from "firebase/database";

// import store, { storeActions } from "../store/store";

import databaseTest from "../firebase/firebaseInitialization";

const kanjiStrokeRetreiver = (kanji) => {
  console.log(kanji);
  const databaseRef = ref(databaseTest);

  const awaitDatabaseData = async () => {
    const svgStroke = await get(child(databaseRef, `KanjiSvgs/${kanji}`));
    try {
      if (svgStroke.exists()) {
        const val = svgStroke.val();
        return val;
      }
    } catch (error) {
      console.log(error);
    }
  };
  const retrievedStroke = awaitDatabaseData();

  return retrievedStroke;
};

export default kanjiStrokeRetreiver;
