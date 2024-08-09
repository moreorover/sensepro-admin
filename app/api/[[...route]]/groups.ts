import { Hono } from "hono";

import { createGroup, updateGroup } from "@/lib/apiSchema";
import { validateRequest } from "@/lib/auth/validate-request";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { createId } from "@paralleldrive/cuid2";
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

      const data = await prisma.group.findMany({
        where: {
          locationId: locationId ? locationId : undefined,
        },
        include: {
          devices: true,
        },
      });

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

      const data = await prisma.group.findUnique({
        where: { id: id },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json(data);
    }
  )
  .post("/", zValidator("json", createGroup), async (c) => {
    const values = c.req.valid("json");

    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await prisma.group.create({
      data: {
        ...values,
        id: createId(),
      },
    });

    return c.json(data);
  })
  .patch(
    "/:id",
    zValidator(
      "param",
      z.object({
        id: z.string().optional(),
      })
    ),
    zValidator("json", updateGroup),
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

      const data = prisma.group.update({
        where: { id: id },
        data: { ...values },
      });

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

      const data = await prisma.group.delete({
        where: { id: id },
      });

      if (!data) {
        return c.json({ error: "Not found" }, 404);
      }
      return c.json({ id: data.id });
    }
  );

export default app;
