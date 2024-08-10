import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DeviceCard } from "@/features/devices/components/device-card";
import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { GroupShemaType } from "@/lib/apiSchema";
import { DeviceType } from "@prisma/client";
import { GroupEditButton } from "./group-edit-button";

export const GroupCard = (props: GroupShemaType) => {
  const newDevice = useNewDevice();

  const openNewDevice = (groupId: string, deviceType: DeviceType) => {
    newDevice.setLocationId(props.locationId);
    newDevice.setGroupId(groupId);
    newDevice.setDeviceType(deviceType);
    newDevice.onOpen();
  };
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
          <Button
            size="sm"
            onClick={() => openNewDevice(props.id, DeviceType.Controller)}
            disabled={props.devices.some(
              (device) => device.deviceType === DeviceType.Controller
            )}
          >
            Add Controller
          </Button>
          <Button
            size="sm"
            onClick={() => openNewDevice(props.id, DeviceType.CCTV_Camera)}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          >
            Add CCTV
          </Button>
          <Button
            size="sm"
            onClick={() => openNewDevice(props.id, DeviceType.NVR)}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          >
            Add NVR
          </Button>
          <Button
            size="sm"
            onClick={() => openNewDevice(props.id, DeviceType.Detector)}
            disabled={
              !props.devices.some(
                (device) => device.deviceType === DeviceType.Controller
              )
            }
          >
            Add Detector
          </Button>
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
