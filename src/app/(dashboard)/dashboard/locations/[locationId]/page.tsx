import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocation } from "@/data-access/location";
import LocationPage from "@/components/dashboard/locations/LocationPage";
import { getCustomer } from "@/data-access/customer";
import { getDevicesByLocationId } from "@/data-access/device";
import { getDeviceTypes } from "@/data-access/deviceType";
import { getRulesByLocationId } from "@/data-access/rule";

type Props = {
  params: Promise<{ locationId: string }>;
};

export default async function Page({ params }: Props) {
  const { locationId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const location = await getLocation(locationId);

  if (!location) {
    return redirect("/dashboard/locations");
  }

  const deviceTypes = await getDeviceTypes();
  const customer = await getCustomer(location.customerId);
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
  return (
    <LocationPage
      location={location}
      customer={customer!}
      deviceGroups={deviceGroups}
      deviceTypes={deviceTypes}
    />
  );
}
