import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getNewPhotos = createAsyncThunk(
  "initialState/getNewPhotos",
  async function (params, { rejectWithValue }) {
    try {
      const response = await axios.get(
        `https://jsonplaceholder.typicode.com/photos?_limit=10&_page=${params}`
      );

      if (response.status !== 200) {
        throw new Error("Server Error");
      }
      return {
        data: response.data,
        totalCount: +response.headers["x-total-count"],
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
