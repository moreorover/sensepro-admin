"use server";

import "server-only";

import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDeviceTypes } from "@/data-access/deviceType";
import { getCustomer } from "@/data-access/customer";
import { getDevicesByLocationId } from "@/data-access/device";
import { getRulesByLocationId } from "@/data-access/rule";
import { getLocation } from "@/data-access/location";

export async function getLocationPageData(locationId: string) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const location = await getLocation(locationId);

  // TODO improve this
  const deviceTypes = await getDeviceTypes();
  const customer = await getCustomer(location!.customerId!);
  const devices = await getDevicesByLocationId(locationId);
  const rules = await getRulesByLocationId(locationId);
  const deviceGroups = devices
    .filter((device) => device.deviceTypeId === "controller")
    .map((controller) => ({
      controllerId: controller.id,
      controller,
      devices: devices.filter(
        (device) => device.controllerId === controller.id,
      ),
      rules: rules
        .filter((rule) => rule.controllerId === controller.id)
        .map((rule) => ({
          rule: {
            id: rule.id,
            name: rule.name,
            type: rule.type,
            controllerId: rule.controllerId,
            locationId: rule.locationId,
          },
          devices: rule.devices
            .map((ruleDevice) =>
              devices.find((device) => device.id === ruleDevice.deviceId),
            )
            .filter((device) => device !== undefined),
          selectedDevices: rule.devices.map((device) => device.deviceId),
        })),
      devicesAllowedInRules: devices.filter(
        (device) =>
          device.controllerId === controller.id &&
          deviceTypes.find(
            (deviceType) => deviceType.id === device.deviceTypeId,
          )?.allowInRules,
      ),
    }));
  return { customer, deviceGroups, deviceTypes };
}
