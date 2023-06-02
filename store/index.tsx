import { configureStore } from "@reduxjs/toolkit";
import paginationSlice from "./pagination";
import favoriteBooksSlice from "./favoriteBooks";

const store = configureStore({
  reducer: {
    pagination: paginationSlice.reducer,
    favoriteBooks: favoriteBooksSlice.reducer,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export default store;
