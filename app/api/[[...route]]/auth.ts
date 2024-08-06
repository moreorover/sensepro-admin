import { Hono } from "hono";

import { lucia } from "@/lib/auth/lucia";
import { validateRequest } from "@/lib/auth/validate-request";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { generateId, Scrypt } from "lucia";
import { z } from "zod";

const app = new Hono()
  .get("/", async (c) => {
    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    return c.json({ user });
  })
  .post(
    "/signup",
    zValidator(
      "json",
      z.object({
        email: z.string(),
        password: z.string().min(6),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const { user } = await validateRequest();

      if (user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          email: values.email,
        },
      });

      if (existingUser) {
        return c.json({ error: "Cannot create account." }, 404);
      }

      const passwordHash = await new Scrypt().hash(values.password);

      const userId = generateId(21);

      const data = await prisma.user.create({
        data: {
          id: userId,
          email: values.email,
          hashedPassword: passwordHash,
        },
      });

      const session = await lucia.createSession(userId, {});
      // const sessionCookie = lucia.createSessionCookie(session.id);
      // cookies().set(
      //   sessionCookie.name,
      //   sessionCookie.value,
      //   sessionCookie.attributes,
      // );

      c.res.headers.set(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );

      return c.json({ id: data.id, email: data.email });
    }
  )
  .post(
    "/signin",
    zValidator(
      "json",
      z.object({
        email: z.string(),
        password: z.string().min(6),
      })
    ),
    async (c) => {
      const values = c.req.valid("json");

      const { user } = await validateRequest();

      if (user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      const existingUser = await prisma.user.findFirst({
        where: {
          email: values.email,
        },
      });

      if (!existingUser) {
        return c.json({ error: "Cannot sign in to this account." }, 404);
      }

      const validPassword = await new Scrypt().verify(
        existingUser.hashedPassword || "",
        values.password
      );

      if (!validPassword) {
        return c.json({ error: "Cannot sign in to this account." }, 404);
      }

      const session = await lucia.createSession(existingUser.id, {});
      // const sessionCookie = lucia.createSessionCookie(session.id);
      // cookies().set(
      // sessionCookie.name,
      // sessionCookie.value,
      // sessionCookie.attributes,
      // );

      c.res.headers.set(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      );

      return c.json({ id: existingUser.id, email: existingUser.email });
    }
  );

export default app;
