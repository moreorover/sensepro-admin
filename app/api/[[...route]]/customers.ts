import { Hono } from "hono";

import { db } from "@/db/drizzle";
import { customers, newCustomerSchema } from "@/db/schema";
import { validateRequest } from "@/lib/auth/validate-request";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
import { eq } from "drizzle-orm";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await db.query.customers.findMany();

    return c.json(data);
  })
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

      const data = await db.query.customers.findFirst({
        where: eq(customers.id, id),
        with: {
          customerLocations: true,
        },
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
      newCustomerSchema.omit({ id: true, createdAt: true, updatedAt: true })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const [data] = await db
        .insert(customers)
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
      newCustomerSchema.omit({ id: true, createdAt: true, updatedAt: true })
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
        .update(customers)
        .set({ ...values })
        .where(eq(customers.id, id))
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
        .delete(customers)
        .where(eq(customers.id, id))
        .returning({ id: customers.id });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  );

export default app;
