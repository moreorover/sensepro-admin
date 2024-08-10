import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceCard } from "@/features/devices/components/device-card";
import { GroupShemaType } from "@/lib/apiSchema";
import { DeviceType } from "@prisma/client";
import { GroupAddDeviceButton } from "./group-add-device-button";
import { GroupEditButton } from "./group-edit-button";

export const GroupCard = (props: GroupShemaType) => {
  return (
    <Card className="col-span-4">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            {props.name}
          </CardTitle>
          <CardDescription>Updated: November 23, 2023</CardDescription>
        </div>
        <div className="ml-auto flex items-center gap-1">
          <GroupAddDeviceButton
            groupId={props.id}
            locationId={props.locationId}
            deviceType={DeviceType.Controller}
            disabled={props.devices.some(
              (device) => device.deviceType === DeviceType.Controller
            )}
          />
          <GroupAddDeviceButton
            groupId={props.id}
            locationId={props.locationId}
            deviceType={DeviceType.NVR}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          />
          <GroupAddDeviceButton
            groupId={props.id}
            locationId={props.locationId}
            deviceType={DeviceType.CCTV_Camera}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          />
          <GroupAddDeviceButton
            groupId={props.id}
            locationId={props.locationId}
            deviceType={DeviceType.Detector}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          />
          <GroupEditButton
            id={props.id}
            deleteDisabled={props.devices.length > 0}
          />
        </div>
      </CardHeader>
      <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
        {props.devices.map((device) => (
          <DeviceCard key={device.id} {...device} />
        ))}
      </CardContent>
    </Card>
  );
};
