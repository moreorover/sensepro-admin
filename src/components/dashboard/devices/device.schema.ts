import { z } from "zod";

export const deviceTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }), // Name must be a non-empty string
});

export type DeviceType = z.infer<typeof deviceTypeSchema>;

const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;

export const deviceSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1),
  mac: z.string().regex(macAddressRegex, "Invalid MAC address format"),
  ip: z.string().ip({ version: "v4" }).nullable(),
  tailscaleIp: z.string().ip({ version: "v4" }).nullable(),
  serialNumber: z.string().min(1),
  locationId: z.string().cuid().nullable(),
  deviceTypeId: z.string(),
  controllerId: z.string().cuid().nullable(),
});

export type Device = z.infer<typeof deviceSchema>;
