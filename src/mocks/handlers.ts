import { rest } from "msw";
import { recordIdMock, recordsApiMock, wrongIdMock } from "./recordsMock";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.json(recordsApiMock));
  }),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/records/${recordIdMock}`,
    (_req, res, ctx) => {
      return res(ctx.json({ message: "Record deleted successfully" }));
    },
  ),
];

export const errorHandlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(404));
  }),
  rest.delete(
    `${import.meta.env.VITE_API_URL}/records/${wrongIdMock}`,
    (_req, res, ctx) => {
      return res(ctx.status(500));
    },
  ),
];
