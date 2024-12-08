"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse, DeviceType, deviceTypeSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getDeviceTypes() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.deviceType.findMany();
}

export async function getDeviceType(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.deviceType.findFirst({ where: { id } });
}

export async function createDeviceType(
  deviceType: DeviceType
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = deviceTypeSchema.safeParse(deviceType);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.deviceType.create({
      data: {
        id: parse.data.name.toLowerCase().replace(/\s+/g, "_"),
        name: parse.data.name,
      },
    });
    revalidatePath("/deviceTypes");
    return {
      message: `Created DeviceType: ${c.name}`,
      type: "SUCCESS",
    };
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  } catch (e) {
    return {
      type: "ERROR",
      message: "Something went wrong!",
    };
  }
}
