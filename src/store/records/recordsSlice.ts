import { createSlice } from "@reduxjs/toolkit";
import { RecordsState } from "./types";

const initialRecordsState: RecordsState = {
  records: [],
};

export const recordsSlice = createSlice({
  name: "records",
  initialState: initialRecordsState,
  reducers: {},
});

export const recordsReducer = recordsSlice.reducer;
