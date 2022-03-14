import { createSlice, configureStore } from "@reduxjs/toolkit";
const initialState = {
  pageButtonClicked: false,
  shopNavButtonClicked: false,
  loginButtonClicked: false,
  signUpButtonClicked: false,
  grammarCardsDB: [],
  kanjiCardsDB: [],
  vocabCardsDB: [],
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
  },
});

const store = configureStore({ reducer: storeSlice.reducer });

export const storeActions = storeSlice.actions;

export default store;
