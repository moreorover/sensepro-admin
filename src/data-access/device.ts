"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import {
  Device,
  deviceSchema,
} from "@/components/dashboard/devices/device.schema";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { ActionResponse } from "@/data-access/serverAction.schema";
import { getLocationPageData } from "@/data-access/locationPage";
import { publishMessage } from "@/data-access/publishMessage";

export async function getDevices() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.device.findMany();
}

export async function getDevice(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.device.findFirst({ where: { id } });
}

// export async function getDevicesByCustomerId(id: string) {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return redirect("/");
//   }

//   return prisma.device.findMany({ where: { customerId: id } });
// }

export async function getDevicesByLocationId(id: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  return prisma.device.findMany({
    where: { locationId: id },
  });
}

export async function createDevice(device: Device): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = deviceSchema.safeParse(device);
    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.device.create({
      data: { ...parse.data },
    });
    revalidatePath("/devices");

    if (c.locationId && c.controllerId) {
      const { deviceGroups } = await getLocationPageData(c.locationId);

      const filtered = deviceGroups.find(
        (deviceGroup) => deviceGroup.controllerId === c.controllerId,
      );

      // TODO maybe publish a simple message to the queue and let more complex backend to deal with this logic
      await publishMessage(
        `controller-${filtered!.controller.serialNumber}`,
        JSON.stringify(filtered),
      );
    }

    return {
      message: `Created Device: ${c.name}`,
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

export async function updateDevice(device: Device): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = deviceSchema.safeParse(device);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.device.update({
      data: { ...parse.data },
      where: { id: parse.data.id },
    });
    revalidatePath("/devices");

    if (c.locationId && c.controllerId) {
      const { deviceGroups } = await getLocationPageData(c.locationId);

      const filtered = deviceGroups.find(
        (deviceGroup) => deviceGroup.controllerId === c.controllerId,
      );

      // TODO maybe publish a simple message to the queue and let more complex backend to deal with this logic
      await publishMessage(
        `controller-${filtered!.controller.serialNumber}`,
        JSON.stringify(filtered),
      );
    }
    return {
      message: `Updated Device: ${c.name}`,
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

export async function deleteDevice(device: Device): Promise<ActionResponse> {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  try {
    const parse = deviceSchema.safeParse(device);

    if (!parse.success) {
      return {
        type: "ERROR",
        message: "Incorrect data received.",
      };
    }
    const c = await prisma.device.delete({
      where: { id: parse.data.id },
    });
    revalidatePath("/devices");

    if (device.locationId && device.controllerId) {
      const { deviceGroups } = await getLocationPageData(device.locationId);

      const filtered = deviceGroups.find(
        (deviceGroup) => deviceGroup.controllerId === c.controllerId,
      );

      // TODO maybe publish a simple message to the queue and let more complex backend to deal with this logic
      await publishMessage(
        `controller-${filtered!.controller.serialNumber}`,
        JSON.stringify(filtered),
      );
    }
    return {
      message: `Deleted Device: ${c.name}`,
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
