import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as useNewDevice from "@/features/devices/hooks/use-new-device";
import { updateDevice } from "@/lib/apiSchema";
import { z } from "zod";
import { useCreateDevice } from "../useDevicesApi";
import { DeviceForm } from "./devices-form";

type FormValues = z.input<typeof updateDevice>;

export const NewDeviceSheet = () => {
  const { isOpen, onClose, locationId, groupId } = useNewDevice.useNewDevice();
  const mutation = useCreateDevice();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(
      {
        ...values,
        locationId,
        groupId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="space-y-4">
        <SheetHeader>
          <SheetTitle>New Device</SheetTitle>
          <SheetDescription>
            Create a new customer location device.
          </SheetDescription>
        </SheetHeader>
        <DeviceForm
          onSubmit={onSubmit}
          disabled={mutation.isPending}
          defaultValues={{
            name: "",
            mac: "",
            ip: "",
            pin: 0,
            deviceType: "Controller",
          }}
        />
      </SheetContent>
    </Sheet>
  );
};
