import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";

import { auth } from "../firebase";
import axios from "axios";
import { Record, RecordApi } from "../types";
import { useDispatch } from "react-redux";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../store/ui/uiSlice";

const useRecordsApi = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const [user] = useIdToken(auth);

  const getRecords = useCallback(async () => {
    dispatch(showLoadingActionCreator());
    const token = await user?.getIdToken();

    try {
      const { data: apiRecords } = await axios.get<{ records: RecordApi[] }>(
        `${apiUrl}/records`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const records = apiRecords.records.map<Record>(({ _id, ...records }) => ({
        ...records,
        id: _id,
      }));

      dispatch(hideLoadingActionCreator());
      return records;
    } catch {
      dispatch(hideLoadingActionCreator());

      throw new Error("Couldn't load records");
    }
  }, [apiUrl, dispatch, user]);

  return { getRecords };
};

export default useRecordsApi;
