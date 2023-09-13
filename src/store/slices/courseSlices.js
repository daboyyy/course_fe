import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  queryData: [],
  searchOptions: [],
};

const courseSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    clearQueryData: (state) => {
      state.queryData = [];
    },
    setQueryData: (state, action) => {
      state.queryData = [...new Set([...state.queryData, ...action.payload])];
    },
    setSearchOptions: (state, action) => {
      state.searchOptions = action.payload;
    },
  },
});

export const { clearQueryData, setQueryData, setSearchOptions } =
  courseSlice.actions;

export default courseSlice.reducer;
