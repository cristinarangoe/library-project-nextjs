import { configureStore } from "@reduxjs/toolkit";
import favoriteBooksSlice from "./favoriteBooks";

const store = configureStore({
  reducer: {
    favoriteBooks: favoriteBooksSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
