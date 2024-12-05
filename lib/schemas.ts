import { z } from "zod";

export type ActionResponse = {
  type: "SUCCESS" | "ERROR";
  message: string;
};

export const customerSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
});

export type Customer = z.infer<typeof customerSchema>;

export const locationSchema = z.object({
  id: z.string().cuid().optional(),
  name: z
    .string()
    .min(5, { message: "Name must be at least 5 characters long" })
    .max(50, { message: "Name cannot exceed 50 characters" }),
  customerId: z.string().cuid(),
});

export type Location = z.infer<typeof locationSchema>;

export const deviceTypeSchema = z.object({
  id: z.string().optional(),
  name: z.string().min(1, { message: "Name is required" }), // Name must be a non-empty string
});
// .transform((data) => ({
// id: data.name.toLowerCase().replace(/\s+/g, "_"), // Generate `id` from `name`
// name: data.name, // Keep `name` as is
// }));

export type DeviceType = z.infer<typeof deviceTypeSchema>;

const macAddressRegex = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;
const ipv4Regex =
  /^(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)$/;

export const deviceSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1),
  mac: z.string().min(1).regex(macAddressRegex, "Invalid MAC address format"),
  ip: z.string().min(1).regex(ipv4Regex, "Invalid IP address format"),
  serialNumber: z.string().min(1),
  locationId: z.string().cuid().optional().nullable(),
  deviceTypeId: z.string(),
  controllerId: z.string().cuid().optional().nullable(),
  createdAt: z.date().optional().nullable(),
  updatedAt: z.date().optional().nullable(),
});

export type Device = z.infer<typeof deviceSchema>;
