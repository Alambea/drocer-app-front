import { useIdToken } from "react-firebase-hooks/auth";
import { useCallback } from "react";

import { auth } from "../firebase";
import axios from "axios";
import { Record, RecordApi } from "../types";

const useRecordsApi = () => {
  const apiUrl = import.meta.env.VITE_API_URL;
  const [user] = useIdToken(auth);

  const getRecords = useCallback(async () => {
    const token = await user?.getIdToken();

    try {
      const { data: apiRecords } = await axios.get<{ records: RecordApi[] }>(
        `${apiUrl}/records`,
        { headers: { Authorization: `Bearer ${token}` } },
      );

      const records = apiRecords.records.map<Record>(
        ({
          _id,
          artist,
          cover,
          description,
          genres,
          label,
          length,
          rating,
          record,
          releaseDate,
        }) => ({
          id: _id,
          artist,
          cover,
          description,
          genres,
          label,
          length,
          rating,
          record,
          releaseDate,
        }),
      );

      return records;
    } catch {
      throw new Error("Couldn't load records");
    }
  }, [apiUrl, user]);

  return { getRecords };
};

export default useRecordsApi;
