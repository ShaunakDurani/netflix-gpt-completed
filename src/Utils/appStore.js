import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import moviesReducer from "./movieSlice";
import gptSlice from "./gptSlice";
import languageSlice from "./languageSlice";

const appStore = configureStore({
  reducer: {
    user: userReducer,
    movies: moviesReducer,
    gpt: gptSlice,
    langconfig: languageSlice,
  },
});

export default appStore;
