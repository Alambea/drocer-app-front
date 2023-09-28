import { paths, titles } from "../routers/paths";
import { Record } from "../types";

const setDocumentTitle = (currentPathName: string, selectedRecord: Record) => {
  const pathPosition = Object.values(paths).findIndex(
    (path) => path === currentPathName,
  );
  const page = Object.keys(paths)[pathPosition];

  let title = titles[page];

  if (!title && selectedRecord) {
    title = `Drocer - Record information from ${selectedRecord.artist}'s record ${selectedRecord.record}`;
  }

  if (title) {
    document.title = title;
  }
};

export default setDocumentTitle;
