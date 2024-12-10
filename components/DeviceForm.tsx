"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Device, deviceSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { createDevice, updateDevice } from "@/data-access/device";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  device: Device;
  className?: string;
};

export default function DeviceForm({ device, className }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Device>({
    resolver: zodResolver(deviceSchema),
    defaultValues: {
      ...device,
    },
  });

  async function onSubmit(values: Device) {
    setSubmitting(true);
    const response = device.id
      ? await updateDevice(values)
      : await createDevice(values);
    setSubmitting(false);

    if (response.type === "ERROR") {
      toast({
        variant: "destructive",
        description: response.message,
      });
    } else {
      toast({
        variant: "default",
        description: response.message,
      });
      router.back();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2", className)}
      >
        {(device.locationId ?? null) !== null && (
          <FormField
            control={form.control}
            name="locationId"
            render={({ field }) => (
              <FormItem className="sr-only">
                <FormLabel>Location ID</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {(device.controllerId ?? null) !== null && (
          <FormField
            control={form.control}
            name="controllerId"
            render={({ field }) => (
              <FormItem className="sr-only">
                <FormLabel>Controller ID</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} value={field.value ?? ""} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        {device.id && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="sr-only">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Device 1" {...field} />
                {/* <ZodErrors error={state?.zodErrors?.name} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="mac"
          render={({ field }) => (
            <FormItem>
              <FormLabel>MAC Address</FormLabel>
              <FormControl>
                <Input placeholder="2c:65:16:a5:9d:5d" {...field} />
                {/* <ZodErrors error={state?.zodErrors?.name} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="ip"
          render={({ field }) => (
            <FormItem>
              <FormLabel>IP Address</FormLabel>
              <FormControl>
                <Input placeholder="127.0.0.1" {...field} />
                {/* <ZodErrors error={state?.zodErrors?.name} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {device.deviceTypeId === "controller" && (
          <FormField
            control={form.control}
            name="tailscaleIp"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tail Scale IP address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="127.0.0.1"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="serialNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Serial Number</FormLabel>
              <FormControl>
                <Input placeholder="01JEE8YZ3D5X9W2..." {...field} />
                {/* <ZodErrors error={state?.zodErrors?.name} /> */}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {device.id ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
