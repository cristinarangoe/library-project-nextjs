import { createSlice } from "@reduxjs/toolkit";

const initialPaginationState = {
  offset: 0,
  limit: 10,
  currentPage: 1,
  totalPages: 0,
  lowerPageRange: 1,
};

const paginationSlice = createSlice({
  name: "pagination",
  initialState: initialPaginationState,
  reducers: {
    nextPage(state) {
      if (state.currentPage === state.totalPages) return;
      state.offset += state.limit;
      state.currentPage++;
      if (+state.totalPages <= 5) return;
      if (state.currentPage === +state.totalPages) {
        state.lowerPageRange = +state.totalPages - 5;
        return;
      }
      if (
        +state.totalPages - 5 <= state.currentPage &&
        +state.currentPage < +state.totalPages
      ) {
        state.lowerPageRange = +state.totalPages - 5;
        return;
      }
      state.lowerPageRange++;
    },
    previousPage(state) {
      if (state.currentPage === 1) return;

      state.offset -= state.limit;
      state.currentPage--;

      if (+state.totalPages <= 5) return;

      if (
        +state.totalPages - 5 < +state.currentPage &&
        +state.currentPage <= +state.totalPages
      ) {
        state.lowerPageRange = +state.lowerPageRange - 5;
        return;
      }
      state.lowerPageRange--;
    },
    goToAPage(state, action) {
      state.offset = state.limit * (action.payload - 1);
      state.currentPage = +action.payload;

      if (+state.totalPages <= 5) return;

      if (+action.payload === +state.totalPages) {
        state.lowerPageRange = +state.totalPages - 5;
        return;
      }
      if (
        +state.totalPages - 5 <= +action.payload &&
        +action.payload < +state.totalPages
      ) {
        state.lowerPageRange = +state.totalPages - 5;
        return;
      }
      state.lowerPageRange = +action.payload;
    },
    setLimit(state, action) {
      state.limit = +action.payload;
    },
    setTotalPages(state, action) {
      state.totalPages = action.payload;
    },
  },
});

export default paginationSlice;
export const paginationActions = paginationSlice.actions;
