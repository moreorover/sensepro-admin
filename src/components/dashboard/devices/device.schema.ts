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
  pin: z
    .union([z.string(), z.number()])
    .transform((val) =>
      typeof val === "string" && val.trim() === "" ? null : Number(val),
    )
    .refine((pin) => pin === null || pin >= 0, {
      message: "Pin number must be at least 0",
    })
    .refine((pin) => pin === null || pin <= 27, {
      message: "Pin number cannot exceed 27",
    })
    .refine((pin) => pin === null || ![2, 4, 6, 9].includes(pin), {
      message:
        "This pin is reserved for power/ground and cannot be used as GPIO",
    }),
  serialNumber: z.string().min(1),
  locationId: z.string().cuid().nullable(),
  deviceTypeId: z.string(),
  controllerId: z.string().cuid().nullable(),
});

export type Device = z.infer<typeof deviceSchema>;

export const ruleSchema = z.object({
  id: z.string().cuid().optional(),
  name: z.string().min(1),
  type: z.enum(["AND", "OR"]),
  locationId: z.string().cuid(),
  controllerId: z.string().cuid(),
});

export type Rule = z.infer<typeof ruleSchema>;

export const ruleDevicesSchema = z.object({
  selectedDevices: z.array(z.string()),
});

export type RuleDevices = z.infer<typeof ruleDevicesSchema>;
