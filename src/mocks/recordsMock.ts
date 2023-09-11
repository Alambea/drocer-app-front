import { Record, RecordsApi } from "../types";

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

export const recordsApiMock: RecordsApi = {
  records: [
    {
      _id: "1",
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
      _id: "2",
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
    {
      _id: "3",
      record: "Mezzanine",
      artist: "Massive Attack",
      cover: "http://example.com/image.png",
      description:
        "Mezzanine is the third studio album by English electronic music group Massive Attack, released on 20 April 1998 by Circa and Virgin Records.",
      genres: "Trip-hop, electronica",
      label: "Virgin - Circa",
      length: "63:29",
      rating: 4,
      releaseDate: 1998,
    },
    {
      _id: "4",
      record: "Heliocentric",
      artist: "The Ocean",
      cover: "http://example.com/image.png",
      description:
        "Heliocentric is the fourth studio album by German progressive metal band The Ocean, released on 9 April 2010.",
      genres: "Post-metal, post-rock, sludge metal, progressive metal",
      label: "Pelagic, Metal Blade",
      length: "	50:58",
      rating: 4,
      releaseDate: 2010,
    },
  ],
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
  {
    id: "3",
    record: "Mezzanine",
    artist: "Massive Attack",
    cover: "http://example.com/image.png",
    description:
      "Mezzanine is the third studio album by English electronic music group Massive Attack, released on 20 April 1998 by Circa and Virgin Records.",
    genres: "Trip-hop, electronica",
    label: "Virgin - Circa",
    length: "63:29",
    rating: 4,
    releaseDate: 1998,
  },
  {
    id: "4",
    record: "Heliocentric",
    artist: "The Ocean",
    cover: "http://example.com/image.png",
    description:
      "Heliocentric is the fourth studio album by German progressive metal band The Ocean, released on 9 April 2010.",
    genres: "Post-metal, post-rock, sludge metal, progressive metal",
    label: "Pelagic, Metal Blade",
    length: "	50:58",
    rating: 4,
    releaseDate: 2010,
  },
];
