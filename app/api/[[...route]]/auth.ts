import { Hono } from "hono";

import { lucia } from "@/lib/auth/lucia";
import { validateRequest } from "@/lib/auth/validate-request";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { generateId, Scrypt } from "lucia";
import { z } from "zod";

import { getConnInfo } from 'hono/vercel'

const app = new Hono()
    .get("/", async (c) => {
      const info = getConnInfo(c); // info is `ConnInfo`
      const ip = info.remote.address ? info.remote.address : "unknown"

      console.log("[/auth] - Connection IP:", ip);

      const { user } = await validateRequest();

      if (!user) {
        return c.json({ error: "Unauthorized" }, 401);
      }

      return c.json({ user });
    })
    .post(
        "/auth/signup",
        zValidator(
            "json",
            z.object({
              email: z.string(),
              password: z.string().min(6),
            })
        ),
        async (c) => {
          console.log("[/auth/signup] - Start");

          const values = c.req.valid("json");

          const info = getConnInfo(c); // info is `ConnInfo`
          const ip = info.remote.address ? info.remote.address : "unknown"

          console.log("[/auth/signup] - Connection IP:", ip);

          const { user } = await validateRequest();

          if (user) {
            console.log("[/auth/signup] - Unauthorized request: User already authenticated.");
            return c.json({ error: "Unauthorized" }, 401);
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              email: values.email,
            },
          });

          if (existingUser) {
            console.log("[/auth/signup] - Account with email already exists.");
            return c.json({ error: "Cannot create account." }, 404);
          }

          try {
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

            console.log("[/auth/signup] - Successful account creation for", values.email);
            return c.json({ id: data.id, email: data.email });
          } catch (error) {
            console.error("[/auth/signup] - Error during account creation:", error);
            return c.json({ error: "Internal server error" }, 500);
          }
        }
    )
    .post(
        "/auth/signin",
        zValidator(
            "json",
            z.object({
              email: z.string(),
              password: z.string().min(6),
            })
        ),
        async (c) => {
          console.log("[/auth/signin] - Start");

          const values = c.req.valid("json");

          const info = getConnInfo(c); // info is `ConnInfo`
          const ip = info.remote.address ? info.remote.address : "unknown"

          console.log("[/auth/signin] - Connection IP:", ip);

          const { user } = await validateRequest();

          if (user) {
            console.log("[/auth/signin] - Unauthorized request: User already authenticated.");
            return c.json({ error: "Unauthorized" }, 401);
          }

          const existingUser = await prisma.user.findFirst({
            where: {
              email: values.email,
            },
          });

          if (!existingUser) {
            console.log("[/auth/signin] - Account not found for email:", values.email);
            return c.json({ error: "Cannot sign in to this account." }, 404);
          }

          const validPassword = await new Scrypt().verify(
              existingUser.hashedPassword || "",
              values.password
          );

          if (!validPassword) {
            console.log("[/auth/signin] - Invalid password for email:", values.email);
            return c.json({ error: "Cannot sign in to this account." }, 404);
          }

          try {
            const session = await lucia.createSession(existingUser.id, {});

            c.res.headers.set(
                "Set-Cookie",
                lucia.createSessionCookie(session.id).serialize()
            );

            console.log("[/auth/signin] - Successful sign-in for email:", values.email);
            return c.json({ id: existingUser.id, email: existingUser.email });
          } catch (error) {
            console.error("[/auth/signin] - Error during sign-in:", error);
            return c.json({ error: "Internal server error" }, 500);
          }
        }
    );

export default app;
