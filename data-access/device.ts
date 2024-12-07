"use server";

import "server-only";

import { auth } from "@/lib/auth";
import prisma from "@/lib/prisma";
import { ActionResponse, Device, deviceSchema } from "@/lib/schemas";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

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

// export async function updateDevice(device: Device): Promise<ActionResponse> {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return redirect("/");
//   }

//   try {
//     const parse = deviceSchema.safeParse(device);

//     if (!parse.success) {
//       return {
//         type: "ERROR",
//         message: "Incorrect data received.",
//       };
//     }
//     const c = await prisma.device.update({
//       data: { name: parse.data.name },
//       where: { id: parse.data.id },
//     });
//     revalidatePath("/devices");
//     return {
//       message: `Updated Device: ${c.name}`,
//       type: "SUCCESS",
//     };
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     return {
//       type: "ERROR",
//       message: "Something went wrong!",
//     };
//   }
// }

// export async function deleteDevice(device: Device): Promise<ActionResponse> {
//   const session = await auth.api.getSession({
//     headers: await headers(),
//   });

//   if (!session) {
//     return redirect("/");
//   }

//   try {
//     const parse = deviceSchema.safeParse(device);

//     if (!parse.success) {
//       return {
//         type: "ERROR",
//         message: "Incorrect data received.",
//       };
//     }
//     const c = await prisma.device.delete({
//       where: { id: parse.data.id },
//     });
//     revalidatePath("/devices");
//     return {
//       message: `Deleted Device: ${c.name}`,
//       type: "SUCCESS",
//     };
//     // eslint-disable-next-line @typescript-eslint/no-unused-vars
//   } catch (e) {
//     return {
//       type: "ERROR",
//       message: "Something went wrong!",
//     };
//   }
// }
