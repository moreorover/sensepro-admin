import { Hono } from "hono";

import { validateRequest } from "@/lib/auth/validate-request";
import prisma from "@/lib/prisma";
import { zValidator } from "@hono/zod-validator";
import { Device } from "@prisma/client";
import { z } from "zod";

const app = new Hono().get(
  "/:mac",
  zValidator("param", z.object({ mac: z.string() })),
  async (c) => {
    const { mac } = c.req.valid("param");

    const { user } = await validateRequest();

    if (!user) {
      return c.json({ error: "Unauthorized" }, 401);
    }

    const data = await prisma.device.findUnique({ where: { mac: mac } });

    if (!data) {
      return c.json({ error: "Controller does not exist." }, 404);
    }

    if (!data.groupId) {
      return c.json({ error: "Controller not assigned to group." }, 404);
    }

    const groupDevices = await prisma.group.findFirst({
      where: { id: data.groupId },
      include: { devices: true },
    });

    let nvr: Device | undefined = undefined;
    const cctv: Device[] = [];
    const detectors: Device[] = [];

    if (groupDevices) {
      groupDevices.devices.forEach((device) => {
        switch (device.deviceType) {
          case "CCTV_Camera":
            cctv.push(device);
            break;
          case "Detector":
            detectors.push(device);
            break;
          case "NVR":
            nvr = device;
        }
      });
    }

    return c.json({ ...data, nvr: nvr, cctv: cctv, detectors: detectors });
  }
);

export default app;
