import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import * as useNewDevice from "@/features/devices/hooks/use-new-device";
import { useGetDeviceTypes } from "@/features/deviceTypes/useDeviceTypesApi";
import { updateDevice } from "@/lib/apiSchema";
import { Loader2 } from "lucide-react";
import { z } from "zod";
import { useCreateDevice } from "../useDevicesApi";
import { DeviceForm } from "./devices-form";

type FormValues = z.input<typeof updateDevice>;

export const NewDeviceSheet = () => {
  const { isOpen, onClose, locationId } = useNewDevice.useNewDevice();
  const mutation = useCreateDevice();

  const deviceTypeQuery = useGetDeviceTypes();

  const onSubmit = (values: FormValues) => {
    mutation.mutate(
      {
        ...values,
        locationId,
      },
      {
        onSuccess: () => {
          onClose();
        },
      }
    );
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
          }}
          deviceTypesOptions={deviceTypeQuery.data}
        />
      </SheetContent>
    </Sheet>
  );
};
