import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordsState } from "./types";
import { Record } from "../../types";

const initialRecordsState: RecordsState = {
  records: [],
};

export const recordsSlice = createSlice({
  name: "records",
  initialState: initialRecordsState,
  reducers: {
    loadRecords: (
      currentRecordState,
      action: PayloadAction<Record[]>,
    ): RecordsState => ({
      ...currentRecordState,
      records: action.payload,
    }),
  },
});

export const recordsReducer = recordsSlice.reducer;
export const { loadRecords: loadRecords } = recordsSlice.actions;
