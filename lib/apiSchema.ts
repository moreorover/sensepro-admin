import { DeviceType } from "@prisma/client";
import { z } from "zod";

const customer = z.object({
  id: z.string(),
  name: z.string().min(6),
});

export const createCustomer = customer.omit({ id: true });
export const updateCustomer = customer.omit({ id: true });

const device = z.object({
  id: z.string(),
  name: z.string().min(6),
  mac: z.string().length(17),
  ip: z.string(),
  pin: z.number(),

  deviceType: z.nativeEnum(DeviceType),
  locationId: z.string().optional().nullable(),
  groupId: z.string().optional().nullable(),
});

export type DeviceShemaType = z.infer<typeof device>;

export const createDevice = device.omit({
  id: true,
});
export const updateDevice = device.omit({
  id: true,
  locationId: true,
});
export const deviceForm = device.omit({
  id: true,
  locationId: true,
  groupId: true,
});

export const deviceType = z.object({
  id: z.string(),
  name: z.string(),
});

export const createDeviceType = deviceType.omit({ id: true });
export const updateDeviceType = deviceType.omit({ id: true });

export const locationType = z.object({
  id: z.string(),
  address: z.string(),
  customerId: z.string().optional(),
});

export const createLocationType = locationType.omit({ id: true });
export const updateLocationType = locationType.omit({ id: true });

export const groupType = z.object({
  id: z.string(),
  name: z.string(),
  locationId: z.string(),
});

export const createGroup = groupType.omit({ id: true });
export const updateGroup = groupType.omit({ id: true, locationId: true });
export const groupForm = groupType.omit({ id: true, locationId: true });
