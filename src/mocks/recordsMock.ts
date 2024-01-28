import { Record, RecordApi, RecordsApi } from "../types";

export const recordIdMock: string = "64fc9c9a5c621a08508d556c";
export const wrongIdMock: string = "75698c6a5c987a08508d58jy";

export const fkaRecordMock: Omit<Record, "id"> = {
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description:
    "LP1 is the debut studio album by English singer-songwriter FKA Twigs",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 3,
  releaseDate: 2014,
};

export const radioheadRecordMock: Omit<Record, "id"> = {
  record: "In Rainbows",
  artist: "Radiohead",
  cover: "http://example.com/image.png",
  description:
    "In Rainbows is the seventh studio album by the English rock band Radiohead.",
  genres: "Art rock, alternative rock, experimental rock, art pop, electronica",
  label: "Self-released",
  length: "42:39",
  rating: 5,
  releaseDate: 2007,
};

export const portisheadRecordMock: Omit<Record, "id"> = {
  record: "Third",
  artist: "Portishead",
  cover: "http://example.com/image.png",
  description:
    "Third is the third and most recent studio album by the English band Portishead",
  genres: "Experimental rock, electronica, psychedelic rock",
  label: "Island - Mercury",
  length: "49:17",
  rating: 4,
  releaseDate: 2008,
};

export const massiveRecordMock: Omit<Record, "id"> = {
  record: "Mezzanine",
  artist: "Massive Attack",
  cover: "http://example.com/image.png",
  description:
    "Mezzanine is the third studio album by English electronic music group Massive Attack",
  genres: "Trip-hop, electronica",
  label: "Virgin - Circa",
  length: "63:29",
  rating: 4,
  releaseDate: 1998,
};

export const oceanRecordMock: Omit<Record, "id"> = {
  record: "Heliocentric",
  artist: "The Ocean",
  cover: "http://example.com/image.png",
  description:
    "Heliocentric is the fourth studio album by German progressive metal band The Ocean",
  genres: "Post-metal, post-rock, sludge metal, progressive metal",
  label: "Pelagic, Metal Blade",
  length: "	50:58",
  rating: 2,
  releaseDate: 2010,
};

export const recordMock: Record = {
  ...fkaRecordMock,
  id: "4o099c6a5c987a08508d58jy",
};

export const fkaRecordApiMock: RecordApi = {
  ...fkaRecordMock,
  _id: "4o099c6a5c987a08508d58jy",
};

export const fkaRatedRecordApiMock: RecordApi = {
  ...fkaRecordApiMock,
  rating: 5,
};

export const radioheadRecordApiMock = {
  ...radioheadRecordMock,
  _id: recordIdMock,
};

export const recordsApiMock: RecordsApi = {
  records: [
    { ...radioheadRecordMock, _id: recordIdMock },
    {
      ...portisheadRecordMock,
      _id: "1o8c9c6a5c621a08508d598y",
    },
    { ...massiveRecordMock, _id: "12hj7c6a5c621a08508d678e" },
    {
      ...oceanRecordMock,
      _id: "73fc9c6a5c621a08508d534j",
    },
  ],
  count: "4",
};

export const filteredRecordsApiMock: RecordsApi = {
  records: [
    { ...radioheadRecordMock, _id: recordIdMock },
    {
      ...portisheadRecordMock,
      _id: "1o8c9c6a5c621a08508d598y",
    },
  ],
  count: "2",
};

export const modifiedRecordsApiMock: RecordsApi = {
  records: [
    { ...radioheadRecordMock, _id: recordIdMock, artist: "Another Artist" },
    {
      ...portisheadRecordMock,
      _id: "1o8c9c6a5c621a08508d598y",
    },
    { ...massiveRecordMock, _id: "12hj7c6a5c621a08508d678e" },
    {
      ...oceanRecordMock,
      _id: "73fc9c6a5c621a08508d534j",
    },
  ],
  count: "4",
};

export const recordsMock: Record[] = [
  {
    ...radioheadRecordMock,
    id: recordIdMock,
  },
  {
    ...portisheadRecordMock,
    id: "1o8c9c6a5c621a08508d598y",
  },
  { ...massiveRecordMock, id: "12hj7c6a5c621a08508d678e" },
  {
    ...oceanRecordMock,
    id: "73fc9c6a5c621a08508d534j",
  },
];
