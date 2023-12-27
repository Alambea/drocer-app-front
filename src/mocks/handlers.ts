import { rest } from "msw";
import {
  fkaRatedRecordApiMock,
  fkaRecordApiMock,
  modifiedRecordsApiMock,
  radioheadRecordApiMock,
  recordsApiMock,
} from "./recordsMock";

const urlApi = import.meta.env.VITE_API_URL;

export const handlers = [
  rest.get(`${urlApi}/records`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(recordsApiMock)),
  ),

  rest.delete(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ message: "Record deleted successfully" })),
  ),

  rest.post(`${urlApi}/records`, (_req, res, ctx) =>
    res(ctx.status(201), ctx.json({ record: fkaRecordApiMock })),
  ),

  rest.get(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ record: radioheadRecordApiMock })),
  ),

  rest.patch(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ record: fkaRatedRecordApiMock })),
  ),
];

export const modifyHandlers = [
  rest.get(`${urlApi}/records`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json(modifiedRecordsApiMock)),
  ),

  rest.get(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ record: radioheadRecordApiMock })),
  ),

  rest.patch(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(200), ctx.json({ record: radioheadRecordApiMock })),
  ),
];

export const errorHandlers = [
  rest.get(`${urlApi}/records`, (_req, res, ctx) =>
    res(ctx.status(404), ctx.json({ error: "Couldn't get records" })),
  ),

  rest.delete(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(500), ctx.json({ error: "Couldn't delete record" })),
  ),

  rest.post(`${urlApi}/records`, (_req, res, ctx) =>
    res(ctx.status(500), ctx.json({ error: "Couldn't add record" })),
  ),

  rest.get(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(500), ctx.json({ error: "Couldn't retrieve record" })),
  ),

  rest.patch(`${urlApi}/records/:id`, (_req, res, ctx) =>
    res(ctx.status(304), ctx.json({ error: "Failed to modify record" })),
  ),
];
