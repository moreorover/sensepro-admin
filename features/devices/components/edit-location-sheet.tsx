import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { newDeviceSchema } from "@/db/schema";
import { useOpenDevice } from "@/features/devices/hooks/use-open-device";
import {
  useDeleteDevice,
  useGetDevice,
  useUpdateDevice,
} from "@/features/devices/useDevicesApi";
import { useGetDeviceTypes } from "@/features/deviceTypes/useDeviceTypesApi";
import { useConfirm } from "@/hooks/use-confirm";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { DeviceForm } from "./devices-form";

const formSchema = newDeviceSchema.pick({
  name: true,
  macAddress: true,
  ip: true,
});

type FormValues = z.input<typeof formSchema>;

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

  const deviceTypeQuery = useGetDeviceTypes();

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
        macAddress: deviceQuery.data.macAddress,
        ip: deviceQuery.data.ip,
        deviceTypeId: deviceQuery.data.deviceTypeId,
      }
    : {
        name: "",
        macAddress: "",
        ip: "",
        deviceTypeId: "",
      };

  if (!deviceTypeQuery.data) {
    return (
      <div className="mx-auto -mt-24 w-full max-w-screen-2xl pb-10">
        <Card className="border-none drop-shadow-sm">
          <CardHeader className="h-8 w-48"></CardHeader>
          <CardContent>
            <div className="flex h-[500px] w-full items-center justify-center">
              <Loader2 className="size-6 animate-spin text-slate-300" />
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

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
              defaultValues={defaultValues}
              onDelete={() => onDelete()}
              deviceTypesOptions={deviceTypeQuery.data}
            />
          )}
        </SheetContent>
      </Sheet>
    </>
  );
};
