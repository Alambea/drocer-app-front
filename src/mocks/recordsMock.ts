import { Record, RecordApi, RecordsApi } from "../types";

export const recordIdMock: string = "64fc9c9a5c621a08508d556c";
export const wrongIdMock: string = "75698c6a5c987a08508d58jy";

export const recordToAddMock: Omit<Record, "id"> = {
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description:
    "LP1 is the debut studio album by English singer-songwriter FKA Twigs, released on 6 August 2014 by Young Turks. Production for the album is handled by FKA Twigs herself, alongside Emile Haynie, Arca, Cy An, Devonté Hynes, Clams Casino, Paul Epworth, Sampha and Tic.",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 3,
  releaseDate: 2014,
};

export const recordMock: Record = {
  id: "4o099c6a5c987a08508d58jy",
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description:
    "LP1 is the debut studio album by English singer-songwriter FKA Twigs, released on 6 August 2014 by Young Turks. Production for the album is handled by FKA Twigs herself, alongside Emile Haynie, Arca, Cy An, Devonté Hynes, Clams Casino, Paul Epworth, Sampha and Tic.",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 3,
  releaseDate: 2014,
};

export const recordApiMock: RecordApi = {
  _id: "4o099c6a5c987a08508d58jy",
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description:
    "LP1 is the debut studio album by English singer-songwriter FKA Twigs, released on 6 August 2014 by Young Turks. Production for the album is handled by FKA Twigs herself, alongside Emile Haynie, Arca, Cy An, Devonté Hynes, Clams Casino, Paul Epworth, Sampha and Tic.",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 3,
  releaseDate: 2014,
};

export const recordGetByIdMock = {
  _id: recordIdMock,
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

export const expectedRecordApiMock: Record = {
  id: "4o099c6a5c987a08508d58jy",
  record: "LP1",
  artist: "FKA Twigs",
  cover: "http://example.com/image.png",
  description:
    "LP1 is the debut studio album by English singer-songwriter FKA Twigs, released on 6 August 2014 by Young Turks. Production for the album is handled by FKA Twigs herself, alongside Emile Haynie, Arca, Cy An, Devonté Hynes, Clams Casino, Paul Epworth, Sampha and Tic.",
  genres: "Avant-pop, electronic, art pop R&B, trip hop",
  label: "Young Turks",
  length: "40:46",
  rating: 3,
  releaseDate: 2014,
};

export const recordsApiMock: RecordsApi = {
  records: [
    {
      _id: recordIdMock,
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
      _id: "1o8c9c6a5c621a08508d598y",
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
      _id: "12hj7c6a5c621a08508d678e",
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
      _id: "73fc9c6a5c621a08508d534j",
      record: "Heliocentric",
      artist: "The Ocean",
      cover: "http://example.com/image.png",
      description:
        "Heliocentric is the fourth studio album by German progressive metal band The Ocean, released on 9 April 2010.",
      genres: "Post-metal, post-rock, sludge metal, progressive metal",
      label: "Pelagic, Metal Blade",
      length: "	50:58",
      rating: 2,
      releaseDate: 2010,
    },
  ],
};

export const recordsMock: Record[] = [
  {
    id: recordIdMock,
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
    id: "1o8c9c6a5c621a08508d598y",
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
    id: "12hj7c6a5c621a08508d678e",
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
    id: "73fc9c6a5c621a08508d534j",
    record: "Heliocentric",
    artist: "The Ocean",
    cover: "http://example.com/image.png",
    description:
      "Heliocentric is the fourth studio album by German progressive metal band The Ocean, released on 9 April 2010.",
    genres: "Post-metal, post-rock, sludge metal, progressive metal",
    label: "Pelagic, Metal Blade",
    length: "	50:58",
    rating: 2,
    releaseDate: 2010,
  },
];
