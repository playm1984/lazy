import { createSlice } from "@reduxjs/toolkit";

import { getNewPhotos } from "./nativeThunk";

const initialState = {
  photos: [],
  load: false,
  error: null,
  totalCount: 0,
};

const setLoading = (state) => {
  state.load = "loading";
  state.error = null;
};

const setError = (state, action) => {
  state.load = "rejected";
  state.error = action.payload;
};

const nativeSlice = createSlice({
  name: "nativeSlice",
  initialState,
  reducers: {},
  extraReducers: {
    [getNewPhotos.pending]: (state) => setLoading(state),
    [getNewPhotos.fulfilled]: (state, action) => {
      state.load = "resolved";
      state.error = null;
      state.photos = [...state.photos, ...action.payload.data];
      state.totalCount = action.payload.totalCount;
    },
    [getNewPhotos.rejected]: (state, action) => setError(state, action),
  },
});

export default nativeSlice.reducer;
