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
    } catch {
      const message = "Couldn't load records";
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
      throw new Error(message);
    }
  }, [apiUrl, dispatch, user]);

  const deleteRecord = async (id: string) => {
    dispatch(showLoadingActionCreator());
    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: message } = await axios.delete(`${apiUrl}/records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(hideLoadingActionCreator());
      showFeedback("Record deleted successfully", "success");

      return message;
    } catch {
      const message = "Failed to delete record";
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
      throw new Error(message);
    }
  };

  const addRecord = async (newRecord: Omit<Record, "id">) => {
    dispatch(showLoadingActionCreator());
    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: apiRecord } = await axios.post(
        `${apiUrl}/records`,
        newRecord,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const record = {
        ...apiRecord.record,
        id: apiRecord.record._id,
      };
      delete record._id;

      dispatch(hideLoadingActionCreator());
      showFeedback("Record added successfully", "success");

      return record;
    } catch {
      const message = "Failed to add record";
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
      throw new Error(message);
    }
  };

  const getRecordById = useCallback(
    async (id: string) => {
      dispatch(showLoadingActionCreator());

      try {
        if (!user) {
          throw new Error();
        }

        const token = await user.getIdToken();

        const { data: apiRecord } = await axios.get(`${apiUrl}/records/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const record = {
          ...apiRecord.record,
          id: apiRecord.record._id,
        };

        delete record._id;
        dispatch(hideLoadingActionCreator());

        return record;
      } catch {
        const message = "Failed to retrieve record";

        dispatch(hideLoadingActionCreator());
        throw new Error(message);
      }
    },
    [apiUrl, dispatch, user],
  );

  const modifyRecord = async (id: string, update: Partial<Record>) => {
    dispatch(showLoadingActionCreator());

    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: apiRecord } = await axios.patch(
        `${apiUrl}/records/${id}`,
        update,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      const record = {
        ...apiRecord.record,
        id: apiRecord.record._id,
      };
      delete record._id;

      return record;
    } catch {
      const message = "Failed to modify record";
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
      throw new Error(message);
    }
  };

  return { getRecords, deleteRecord, addRecord, getRecordById, modifyRecord };
};

export default useRecordsApi;
