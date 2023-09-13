import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { Record, RecordApi } from "../types";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../store/ui/uiSlice";
import showFeedback from "../utils/showFeedback";

const useRecordsApi = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const dispatch = useDispatch();
  const [user] = useIdToken(auth);

  const getRecords = useCallback(async () => {
    dispatch(showLoadingActionCreator());

    try {
      if (!user) {
        dispatch(hideLoadingActionCreator());

        throw new Error();
      }

      const token = await user.getIdToken();

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
    } catch (error) {
      const message = "Couldn't load records";
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
      throw new Error(message);
    }
  }, [apiUrl, dispatch, user]);

  return { getRecords };
};

export default useRecordsApi;
