import { Button } from "@/components/ui/button";
import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { DeviceType } from "@prisma/client";

type Props = {
  groupId: string;
  locationId: string;
  deviceType: DeviceType;
  disabled: boolean;
};

export const GroupAddDeviceButton = ({
  groupId,
  locationId,
  deviceType,
  disabled,
}: Props) => {
  const newDevice = useNewDevice();

  const openNewDevice = () => {
    newDevice.setLocationId(locationId);
    newDevice.setGroupId(groupId);
    newDevice.setDeviceType(deviceType);
    newDevice.onOpen();
  };

  return (
    <Button size="sm" onClick={openNewDevice} disabled={disabled}>
      Add {deviceType}
    </Button>
  );
};
