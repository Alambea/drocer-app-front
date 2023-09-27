export interface Record {
  id: string;
  record: string;
  artist: string;
  cover: string;
  description: string;
  genres: string;
  label: string;
  length: string;
  rating: number;
  releaseDate: number;
}

export interface RecordApi extends Omit<Record, "id"> {
  _id: string;
}

export interface RecordsApi {
  records: RecordApi[];
}

export interface AxiosErrorResponseData {
  error: string;
}
export interface AxiosError extends Error {
  response: { data: AxiosErrorResponseData };
}
