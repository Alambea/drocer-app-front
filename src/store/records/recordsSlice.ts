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

    deleteRecord: (
      currentRecordState,
      action: PayloadAction<string>,
    ): RecordsState => ({
      ...currentRecordState,
      records: currentRecordState.records.filter(
        (record) => record.id !== action.payload,
      ),
    }),
  },
});

export const recordsReducer = recordsSlice.reducer;
export const {
  loadRecords: loadRecordsActionCreator,
  deleteRecord: deleteRecordActionCreator,
} = recordsSlice.actions;
