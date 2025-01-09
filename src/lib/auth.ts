import prisma from "@/lib/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
  trustedOrigins: [process.env.NEXT_PUBLIC_APP_URL as string],
  baseURL: process.env.NEXT_PUBLIC_APP_URL as string,
});
