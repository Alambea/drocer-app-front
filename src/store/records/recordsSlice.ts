import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { RecordsState } from "./types";
import { Record } from "../../types";

const initialRecordsState: RecordsState = {
  records: [],
  recordCount: 0,
};

export const recordsSlice = createSlice({
  name: "records",
  initialState: initialRecordsState,
  reducers: {
    loadRecords: (
      currentRecordState: RecordsState,
      action: PayloadAction<Record[]>,
    ): RecordsState => ({
      ...currentRecordState,
      records: action.payload,
    }),

    loadRecordCount: (
      currentRecordState: RecordsState,
      action: PayloadAction<number>,
    ): RecordsState => ({
      ...currentRecordState,
      recordCount: action.payload,
    }),

    deleteRecord: (
      currentRecordState: RecordsState,
      action: PayloadAction<string>,
    ): RecordsState => ({
      ...currentRecordState,
      records: currentRecordState.records.filter(
        (record) => record.id !== action.payload,
      ),
    }),

    addRecord: (
      currentRecordState: RecordsState,
      action: PayloadAction<Record>,
    ): RecordsState => ({
      ...currentRecordState,
      records: [...currentRecordState.records, action.payload],
    }),

    loadSelectedRecord: (
      currentRecordState: RecordsState,
      action: PayloadAction<Record>,
    ): RecordsState => ({
      ...currentRecordState,
      selectedRecord: action.payload,
    }),

    modifyRecord: (
      currentRecordState: RecordsState,
      action: PayloadAction<Record>,
    ): RecordsState => ({
      ...currentRecordState,
      records: currentRecordState.records.map<Record>((record) =>
        record.id === action.payload.id ? { ...action.payload } : { ...record },
      ),
      selectedRecord: action.payload,
    }),
  },
});

export const recordsReducer = recordsSlice.reducer;
export const {
  loadRecords: loadRecordsActionCreator,
  loadRecordCount: loadRecordCountActionCreator,
  deleteRecord: deleteRecordActionCreator,
  addRecord: addRecordActionCreator,
  loadSelectedRecord: loadSelectedRecordActionCreator,
  modifyRecord: modifyRecordActionCreator,
} = recordsSlice.actions;
