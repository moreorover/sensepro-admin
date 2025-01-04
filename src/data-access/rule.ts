"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/data-access/serverAction.schema";
import {
  Rule,
  ruleDevicesSchema,
  ruleSchema,
} from "@/components/dashboard/devices/device.schema";

export async function getRules() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.rule.findMany();
}

export async function getRule(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.rule.findFirst({ where: { id } });
}

export async function getRulesByLocationId(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.rule.findMany({
    where: { locationId: id },
    include: { devices: true },
  });
}

export async function getRuleDevices(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }
  return prisma.ruleDevice.findMany({
    where: { ruleId: id },
    include: { device: true },
  });
}

export async function updateRuleDevices(
  ruleId: string,
  devices: string[],
): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = ruleDevicesSchema.safeParse({
      id: ruleId,
      selectedDevices: devices,
    });

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }

    await prisma.ruleDevice.deleteMany({ where: { ruleId } });

    const data = parse.data.selectedDevices.map((deviceId) => ({
      ruleId,
      deviceId,
    }));

    await prisma.ruleDevice.createMany({ data, skipDuplicates: true });

    revalidatePath("/rules");
    return {
      message: `Updated rule: ${ruleId} devices`,
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

export async function createRule(rule: Rule): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = ruleSchema.safeParse(rule);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.rule.create({
      data: {
        name: parse.data.name,
        type: parse.data.type,
        locationId: parse.data.locationId,
        controllerId: parse.data.controllerId,
      },
    });
    revalidatePath("/rules");
    return {
      message: `Created Rule: ${c.id}`,
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

export async function updateRule(rule: Rule): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = ruleSchema.safeParse(rule);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.rule.update({
      data: { type: parse.data.type },
      where: { id: parse.data.id },
    });
    revalidatePath("/rules");
    return {
      message: `Updated Rule: ${c.id}`,
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

export async function deleteRule(rule: Rule): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = ruleSchema.safeParse(rule);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.rule.delete({
      where: { id: parse.data.id },
    });
    revalidatePath("/rules");
    return {
      message: `Deleted Rule: ${c.id}`,
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
