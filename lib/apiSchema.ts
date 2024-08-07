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

  deviceTypeId: z.string().optional().nullable(),
  groupId: z.string().optional(),
  locationId: z.string().optional(),
});

export const createDevice = device.omit({
  id: true,
  groupId: true,
  locationId: true,
});
export const updateDevice = device.omit({
  id: true,
  groupId: true,
  locationId: true,
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
