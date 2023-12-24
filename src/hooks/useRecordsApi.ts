import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";
import axios, { AxiosError } from "axios";
import { useDispatch } from "react-redux";
import { auth } from "../firebase";
import { AxiosErrorResponseData, Record, RecordApi } from "../types";
import {
  hideLoadingActionCreator,
  showLoadingActionCreator,
} from "../store/ui/uiSlice";
import { paths } from "../routers/paths";
import { useNavigate } from "react-router-dom";
import { showFeedback } from "../utils/showFeedback";
import apiRecordToRecord from "../utils/apiRecordToRecord";

const useRecordsApi = () => {
  axios.defaults.baseURL = import.meta.env.VITE_API_URL;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user] = useIdToken(auth);

  const getRecords = useCallback(async () => {
    dispatch(showLoadingActionCreator());
    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: apiRecords } = await axios.get<{ records: RecordApi[] }>(
        "/records",
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const records = apiRecords.records.map<Record>(({ _id, ...records }) => ({
        ...records,
        id: _id,
      }));

      dispatch(hideLoadingActionCreator());

      return records;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      let message = "Couldn't load records";

      if (axiosError.response) {
        const axiosErrorData = axiosError.response
          .data as AxiosErrorResponseData;
        message = axiosErrorData.error;
      }

      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
    }
  }, [dispatch, user]);

  const deleteRecord = async (id: string) => {
    dispatch(showLoadingActionCreator());
    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: message } = await axios.delete(`/records/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      dispatch(hideLoadingActionCreator());
      showFeedback("Record deleted successfully", "success");

      return message;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      let message = "Failed to delete record";

      if (axiosError.response) {
        const axiosErrorData = axiosError.response
          .data as AxiosErrorResponseData;
        message = axiosErrorData.error;
      }
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
    }
  };

  const addRecord = async (newRecord: Omit<Record, "id">) => {
    dispatch(showLoadingActionCreator());
    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: apiRecord } = await axios.post("/records", newRecord, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const record = {
        ...apiRecord.record,
        id: apiRecord.record._id,
      };
      delete record._id;

      dispatch(hideLoadingActionCreator());
      showFeedback("Record added successfully", "success");

      return record;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      let message = "Failed to add record";

      if (axiosError.response) {
        const axiosErrorData = axiosError.response
          .data as AxiosErrorResponseData;
        message = axiosErrorData.error;
      }
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
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

        const { data: apiRecord } = await axios.get(`/records/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        const record = apiRecordToRecord(apiRecord.record);

        dispatch(hideLoadingActionCreator());

        return record;
      } catch (error: unknown) {
        const axiosError = error as AxiosError;
        let message = "Failed to retrieve record";

        if (axiosError.response) {
          const axiosErrorData = axiosError.response
            .data as AxiosErrorResponseData;
          message = axiosErrorData.error;
        }
        dispatch(hideLoadingActionCreator());

        showFeedback(message, "error");
        navigate(paths.records);
      }
    },
    [dispatch, navigate, user],
  );

  const modifyRecord = async (id: string, update: Partial<Record>) => {
    dispatch(showLoadingActionCreator());

    try {
      if (!user) {
        throw new Error();
      }

      const token = await user.getIdToken();

      const { data: apiRecord } = await axios.patch(`/records/${id}`, update, {
        headers: { Authorization: `Bearer ${token}` },
      });

      const record = apiRecordToRecord(apiRecord.record);

      dispatch(hideLoadingActionCreator());

      return record;
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      let message = "Failed to modify record";

      if (axiosError.response) {
        const axiosErrorData = axiosError.response
          .data as AxiosErrorResponseData;
        message = axiosErrorData.error;
      }
      dispatch(hideLoadingActionCreator());

      showFeedback(message, "error");
    }
  };

  return { getRecords, deleteRecord, addRecord, getRecordById, modifyRecord };
};

export default useRecordsApi;
