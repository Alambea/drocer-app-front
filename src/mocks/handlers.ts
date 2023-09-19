import { rest } from "msw";
import {
  recordApiMock,
  recordGetByIdMock,
  recordIdMock,
  recordsApiMock,
  wrongIdMock,
} from "./recordsMock";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(200), ctx.json(recordsApiMock));
  }),

  rest.delete(
    `${import.meta.env.VITE_API_URL}/records/${recordIdMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ message: "Record deleted successfully" }),
      );
    },
  ),

  rest.post(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(201), ctx.json({ record: recordApiMock }));
  }),

  rest.get(
    `${import.meta.env.VITE_API_URL}/records/${recordIdMock}`,
    (_req, res, ctx) => {
      return res(ctx.status(200), ctx.json({ record: recordGetByIdMock }));
    },
  ),

  rest.patch(
    `${import.meta.env.VITE_API_URL}/records/${recordIdMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ record: { ...recordApiMock, rating: 5 } }),
      );
    },
  ),
  rest.patch(
    `${import.meta.env.VITE_API_URL}/records/73fc9c6a5c621a08508d534j`,
    (_req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json({ record: { ...recordApiMock, rating: 5 } }),
      );
    },
  ),
];

export const errorHandlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(404), ctx.json({ error: "Couldn't get records" }));
  }),

  rest.delete(
    `${import.meta.env.VITE_API_URL}/records/${wrongIdMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ error: "Couldn't delete record" }),
      );
    },
  ),

  rest.post(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(500), ctx.json({ error: "Couldn't add record" }));
  }),

  rest.get(
    `${import.meta.env.VITE_API_URL}/records/${wrongIdMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(500),
        ctx.json({ error: "Couldn't retrieve record" }),
      );
    },
  ),

  rest.patch(
    `${import.meta.env.VITE_API_URL}/records/${wrongIdMock}`,
    (_req, res, ctx) => {
      return res(
        ctx.status(304),
        ctx.json({ error: "Failed to modify record" }),
      );
    },
  ),
];
