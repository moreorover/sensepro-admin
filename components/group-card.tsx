import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { useOpenGroup } from "@/features/groups/hooks/use-open-group";
import { useDeleteGroup } from "@/features/groups/useGroupsApi";
import { useConfirm } from "@/hooks/use-confirm";
import { GroupShemaType } from "@/lib/apiSchema";
import { DeviceType } from "@prisma/client";
import { MoreHorizontal } from "lucide-react";
import { DeviceCard } from "./device-card";
import { Button } from "./ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export const GroupCard = (props: GroupShemaType) => {
  const newDevice = useNewDevice();
  const openGroupEdit = useOpenGroup();
  const deleteMutation = useDeleteGroup(props.id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this customer"
  );

  const handleGroupDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  const openNewDevice = (groupId: string, deviceType: DeviceType) => {
    newDevice.setLocationId(props.locationId);
    newDevice.setGroupId(groupId);
    newDevice.setDeviceType(deviceType);
    newDevice.onOpen();
  };
  return (
    <>
      <ConfirmDialog />
      <Card key={props.id} className="col-span-4">
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
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  {/* <MoveVerticalIcon className="h-3.5 w-3.5" /> */}
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => openGroupEdit.onOpen(props.id)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem
                  disabled={props.devices.length > 0}
                  onClick={() => handleGroupDelete()}
                >
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
          {props.devices.map((device) => (
            <DeviceCard key={device.id} {...device} />
          ))}
        </CardContent>
      </Card>
    </>
  );
};
