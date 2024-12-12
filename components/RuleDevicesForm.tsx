"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Device, RuleDevices, ruleDevicesSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import { updateRuleDevices } from "@/data-access/rule";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Checkbox } from "./ui/checkbox";

type Props = {
  ruleId: string;
  devices: Device[];
  selectedDevices: string[];
  className?: string;
};

export default function RuleDevicesForm({
  ruleId,
  devices,
  selectedDevices,
  className,
}: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<RuleDevices>({
    resolver: zodResolver(ruleDevicesSchema),
    defaultValues: {
      selectedDevices: selectedDevices,
    },
  });

  async function onSubmit(values: RuleDevices) {
    setSubmitting(true);
    const response = await updateRuleDevices(ruleId, values.selectedDevices);
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
        {devices.map((device) => (
          <FormField
            key={device.id}
            control={form.control}
            name="selectedDevices"
            render={({ field }) => {
              return (
                <FormItem
                  key={device.id}
                  className="flex flex-row items-start space-x-3 space-y-0"
                >
                  <FormControl>
                    <Checkbox
                      checked={field.value?.includes(device.id as string)}
                      onCheckedChange={(checked) => {
                        return checked
                          ? field.onChange([...field.value, device.id])
                          : field.onChange(
                              field.value?.filter(
                                (value) => value !== device.id
                              )
                            );
                      }}
                    />
                  </FormControl>
                  <FormLabel className="text-sm font-normal">
                    {device.name}
                  </FormLabel>
                </FormItem>
              );
            }}
          />
        ))}
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating...
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
