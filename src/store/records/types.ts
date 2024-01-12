import { Record } from "../../types";

export interface RecordsState {
  records: Record[];
  recordCount: number;
  selectedRecord?: Record;
}
