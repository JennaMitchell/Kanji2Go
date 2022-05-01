import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  pageButtonClicked: false,
  shopNavButtonClicked: false,
  loginButtonClicked: false,
  signUpButtonClicked: false,
  grammarCardsDB: [],
  kanjiCardsDB: [],
  vocabCardsDB: [],
  kanjiIdClicked: false,
  activePreviewKanjiData: [],
  premadeKanjiFilterArray: [],
  addKanjiMenu: false,
  setBlankSquareMenu: false,
  customKanjiSelectorClickedId: -1,
  kanjiClicked: "",
  blankSquaresArray: "",
  customKanjiSelected: "",
  kanjiDatabase: [],
  customKanjiBoxData: [],
  customKanjiGridData: [],
  customKanjiDeleteIconClicked: false,
  newPageClicked: false,
  databaseLoaded: false,
  fillButtonClicked: false,
  okayClearButtonClicked: false,
  quizKanjiClickedId: -1,
  quizKanjiClicked: "",
  quizKanjiArray: [],
  kanjiWithJLPTTestLevel: [],
  deleteSelectedKanji: "",
};

const storeSlice = createSlice({
  name: "Kanji2Go Store",
  initialState: initialState,
  reducers: {
    setPageButtonClicked(state, { payload }) {
      state.pageButtonClicked = payload;
    },
    setShopNavButtonClicked(state, { payload }) {
      state.shopNavButtonClicked = payload;
    },
    setLoginButtonClicked(state, { payload }) {
      state.loginButtonClicked = payload;
    },
    setSignUpButtonClicked(state, { payload }) {
      state.signUpButtonClicked = payload;
    },
    setGrammarCardsDB(state, { payload }) {
      state.grammarCardsDB = payload;
    },
    setKanjiCardsDB(state, { payload }) {
      state.kanjiCardsDB = payload;
    },
    setVocabCardsDB(state, { payload }) {
      state.vocabCardsDB = payload;
    },
    setKanjiIdClicked(state, { payload }) {
      state.kanjiIdClicked = payload;
    },
    setActivePreviewKanjiData(state, { payload }) {
      state.activePreviewKanjiData = payload;
    },
    setPremadeKanjiFilterArray(state, { payload }) {
      state.premadeKanjiFilterArray = payload;
    },
    setAddKanjiMenu(state, { payload }) {
      state.addKanjiMenu = payload;
    },
    setCustomKanjiSelectorClickedId(state, { payload }) {
      state.customKanjiSelectorClickedId = payload;
    },
    setKanjiClicked(state, { payload }) {
      state.kanjiClicked = payload;
    },
    setBlankSquareMenu(state, { payload }) {
      state.blankSquareMenu = payload;
    },
    setBlankSquaresArray(state, { payload }) {
      state.blankSquaresArray = payload;
    },
    setCustomKanjiSelected(state, { payload }) {
      state.customKanjiSelected = payload;
    },
    setKanjiDatabase(state, { payload }) {
      state.kanjiDatabase = payload;
    },
    setCustomKanjiBoxData(state, { payload }) {
      state.customKanjiBoxData = payload;
    },
    setCustomKanjiGridData(state, { payload }) {
      state.customKanjiGridData = payload;
    },
    setCustomKanjiDeleteIconClicked(state, { payload }) {
      state.customKanjiDeleteIconClicked = payload;
    },
    setNewPageClicked(state, { payload }) {
      state.newPageClicked = payload;
    },
    setDatabaseLoaded(state, { payload }) {
      state.databaseLoaded = payload;
    },
    setFillButtonClicked(state, { payload }) {
      state.fillButtonClicked = payload;
    },
    setOkayClearButtonClicked(state, { payload }) {
      state.okayClearButtonClicked = payload;
    },
    setQuizKanjiClickedId(state, { payload }) {
      state.quizKanjiClickedId = payload;
    },
    setQuizKanjiClicked(state, { payload }) {
      state.quizKanjiClicked = payload;
    },
    setQuizKanjiArray(state, { payload }) {
      state.quizKanjiArray = payload;
    },
    setKanjiWithJLPTTestLevel(state, { payload }) {
      state.kanjiWithJLPTTestLevel = payload;
    },
    setDeleteSelectedKanji(state, { payload }) {
      state.deleteSelectedKanji = payload;
    },
  },
});

const store = configureStore({ reducer: storeSlice.reducer });

export const storeActions = storeSlice.actions;

export default store;
