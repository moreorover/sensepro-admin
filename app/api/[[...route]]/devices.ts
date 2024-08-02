import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { devices, groups, newDeviceSchema } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validate-request";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  .get(
    "/",
    zValidator(
      "query",
      z.object({
        locationId: z.string().optional(),
      })
    ),
    async (c) => {
      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const { locationId } = c.req.valid("query");

      const x = await db.query.groups.findMany({
        where: locationId ? eq(groups.locationId, locationId) : undefined,
        with: {
          devices: true,
          location: true,
        },
      });

      console.log("x2");

      console.log({ x });
      console.log({ loc: x[0].location });
      console.log({ devices: x[0].devices });

      const data = await db.query.devices.findMany({
        where: locationId ? eq(devices.locationId, locationId) : undefined,
        with: {
          deviceType: true,
          group: true,
        },
      });

      console.log({ devicesx: { ...data } });

      return c.json(data);
    }
  )
  .get(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");
      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const data = await db.query.devices.findFirst({
        where: eq(devices.id, id),
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  )
  .post(
    "/",
    zValidator(
      "json",
      newDeviceSchema.omit({ id: true, createdAt: true, updatedAt: true })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(devices)
        .values({
          id: createId(),
          ...values,
        })
        .returning();

      return c.json(data);
    }
  )
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator(
      "json",
      newDeviceSchema.omit({ id: true, createdAt: true, updatedAt: true })
    ),
    async (c) => {
      const { id } = c.req.valid("param");
      const values = c.req.valid("json");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .update(devices)
        .set({ ...values })
        .where(eq(devices.id, id))
        .returning();

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }

      return c.json(data);
    }
  )
  .delete(
    "/:id",
    zValidator("param", z.object({ id: z.string().optional() })),
    async (c) => {
      const { id } = c.req.valid("param");

      if (!id) {
        return c.json({ error: "Missing id" }, 400);
      }

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .delete(devices)
        .where(eq(devices.id, id))
        .returning({ id: devices.id });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  );

export default app;
