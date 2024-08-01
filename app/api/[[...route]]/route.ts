import { Hono } from "hono";
import { handle } from "hono/vercel";

import auth from "./auth";
import customers from "./customers";
import devices from "./devices";
import deviceTypes from "./deviceTypes";
import locations from "./locations";

// export const runtime = "edge";

const app = new Hono().basePath("/api");

const routes = app
  .route("/auth", auth)
  .route("/customers", customers)
  .route("/locations", locations)
  .route("/devices", devices)
  .route("/deviceTypes", deviceTypes);

export const GET = handle(app);
export const POST = handle(app);
export const PATCH = handle(app);
export const DELETE = handle(app);

export type AppType = typeof routes;
