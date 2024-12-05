"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse, Location, locationSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

export async function getLocations() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.location.findMany();
}

export async function getLocation(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.location.findFirst({ where: { id } });
}

export async function getLocationsByCustomerId(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.location.findMany({ where: { customerId: id } });
}

export async function createLocation(
  location: Location
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = locationSchema.safeParse(location);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.location.create({
      data: { name: parse.data.name, customerId: parse.data.customerId },
    });
    revalidatePath("/locations");
    return {
      message: `Created Location: ${c.name}`,
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

export async function updateLocation(
  location: Location
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = locationSchema.safeParse(location);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.location.update({
      data: { name: parse.data.name },
      where: { id: parse.data.id },
    });
    revalidatePath("/locations");
    return {
      message: `Updated Location: ${c.name}`,
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

export async function deleteLocation(
  location: Location
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = locationSchema.safeParse(location);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.location.delete({
      where: { id: parse.data.id },
    });
    revalidatePath("/locations");
    return {
      message: `Deleted Location: ${c.name}`,
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
