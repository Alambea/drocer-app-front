import { rest } from "msw";
import { recordsApiMock } from "./recordsMock";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.json(recordsApiMock));
  }),
];

export const errorHandlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
