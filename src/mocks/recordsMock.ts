import { Record } from "../types";

export const recordMock: Record = {
  id: "1",
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description: "August",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 4,
  releaseDate: 2014,
};

export const recordsMock: Record[] = [
  {
    id: "1",
    record: "In Rainbows",
    artist: "Radiohead",
    cover: "http://example.com/image.png",
    description:
      "In Rainbows is the seventh studio album by the English rock band Radiohead.",
    genres:
      "Art rock, alternative rock, experimental rock, art pop, electronica",
    label: "Self-released",
    length: "42:39",
    rating: 5,
    releaseDate: 2007,
  },
  {
    id: "2",
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
  },
];
