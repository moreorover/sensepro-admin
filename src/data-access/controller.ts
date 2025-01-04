"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getControllerJson(controllerId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const controller = await prisma.device.findUnique({
    where: { id: controllerId },
  });

  const controllerDevices = await prisma.device.findMany({
    where: {
      controllerId,
    },
  });

  const controllerRules = await prisma.rule.findMany({
    where: {
      controllerId,
    },
    include: {
      devices: true,
    },
  });
  return { controller, controllerDevices, controllerRules };
}
