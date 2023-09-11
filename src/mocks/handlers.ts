import { rest } from "msw";
import { recordsMock } from "./recordsMock";

export const handlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.json(recordsMock));
  }),
];

export const errorHandlers = [
  rest.get(`${import.meta.env.VITE_API_URL}/records`, (_req, res, ctx) => {
    return res(ctx.status(404));
  }),
];
