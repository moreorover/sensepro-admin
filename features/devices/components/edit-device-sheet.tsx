import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useOpenDevice } from "@/features/devices/hooks/use-open-device";
import {
  useDeleteDevice,
  useGetDevice,
  useUpdateDevice,
} from "@/features/devices/useDevicesApi";
import { useConfirm } from "@/hooks/use-confirm";
import { deviceForm } from "@/lib/apiSchema";
import { DeviceType } from "@prisma/client";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { DeviceForm } from "./devices-form";

type FormValues = z.input<typeof deviceForm>;

export const EditDeviceSheet = () => {
  const { isOpen, onClose, id } = useOpenDevice();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this device"
  );

  const deviceQuery = useGetDevice(id);
  const editMutation = useUpdateDevice(id);
  const deleteMutation = useDeleteDevice(id);
  const isPending = editMutation.isPending || deleteMutation.isPending;
  const isLoading = deviceQuery.isLoading;

  const onSubmit = (values: FormValues) => {
    editMutation.mutate(values, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate(undefined, {
        onSuccess: () => {
          onClose();
        },
      });
    }
  };

  const defaultValues = deviceQuery.data
    ? {
        name: deviceQuery.data.name,
        mac: deviceQuery.data.mac,
        ip: deviceQuery.data.ip,
        deviceType: deviceQuery.data.deviceType,
        pin: deviceQuery.data.pin,
        serialNumber: deviceQuery.data.serialNumber,
      }
    : {
        name: "",
        mac: "",
        ip: "",
        deviceType: DeviceType.Controller,
        pin: 0,
        serialNumber: "",
      };

  return (
    <>
      <ConfirmDialog />
      <Sheet open={isOpen} onOpenChange={onClose}>
        <SheetContent className="space-y-4">
          <SheetHeader>
            <SheetTitle>Edit Device</SheetTitle>
            <SheetDescription>Edit an existing device.</SheetDescription>
          </SheetHeader>
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="size-4 animate-spin text-muted-foreground" />
            </div>
          ) : (
            <DeviceForm
              id={id}
              onSubmit={onSubmit}
              disabled={isPending}
              onDelete={() => onDelete()}
              defaultValues={defaultValues}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
