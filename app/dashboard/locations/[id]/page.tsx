import { DeviceCard } from "@/components/DeviceCard";
import { NewDeviceLink } from "@/components/NewDeviceLink";
import { NewRuleLink } from "@/components/NewRuleLink";
import { RuleCard } from "@/components/RuleCard";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { getDevicesByLocationId } from "@/data-access/device";
import { getDeviceTypes } from "@/data-access/deviceType";
import { getLocation } from "@/data-access/location";
import { getRulesByLocationId } from "@/data-access/rule";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { PlusCircle, Server } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function LocationsPage({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const { id } = await params;

  const location = await getLocation(id);

  if (!location) {
    return redirect("/locations");
  }

  const devices = await getDevicesByLocationId(location.id);
  const deviceTypes = await getDeviceTypes();
  const rules = await getRulesByLocationId(location.id);

  const getDeviceTypeById = (id: string) => {
    const deviceType = deviceTypes.find((dt) => dt.id === id);
    return deviceType ? deviceType.name : "";
  };

  const getDevicesDetailsForRule = (
    ruleDevices: {
      id: string;
      createdAt: Date;
      ruleId: string;
      deviceId: string;
    }[]
  ) => {
    const ruleDeviceIds = new Set(ruleDevices.map((device) => device.deviceId));
    return devices.filter((device) => ruleDeviceIds.has(device.id));
  };

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <NewDeviceLink
          text={"Add New Controller"}
          className={buttonVariants()}
          locationId={location.id}
          controllerId={null}
          deviceType="controller"
        />
      </div>
      <div className="grid gap-8">
        {devices
          .filter((device) => device.controllerId === null)
          .map((controllerDevice) => (
            <div key={controllerDevice.id} className="space-y-4">
              <div className="flex items-center justify-between bg-gradient-to-r from-blue-400 to-blue-600 text-white p-4 rounded-lg shadow-md mb-4">
                <div className="flex items-center space-x-3">
                  <Server className="h-6 w-6 text-white" />
                  <h2 className="text-xl font-bold">{controllerDevice.name}</h2>
                </div>
                <div className="space-x-2">
                  <Link
                    className={cn(buttonVariants())}
                    href={`/controllers/json/${controllerDevice.id}`}
                  >
                    View JSON
                  </Link>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className={cn(
                          buttonVariants(),
                          "bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                        )}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Device
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      {deviceTypes
                        .filter((deviceType) => deviceType.id !== "controller")
                        .map((deviceType) => (
                          <DropdownMenuItem key={deviceType.id} asChild>
                            <NewDeviceLink
                              text={`New ${deviceType.name}`}
                              className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                              locationId={location.id}
                              controllerId={controllerDevice.id}
                              deviceType={deviceType.id}
                            />
                          </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                  </DropdownMenu>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        className={cn(
                          buttonVariants(),
                          "bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                        )}
                      >
                        <PlusCircle className="mr-2 h-4 w-4" />
                        Add Rule
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem key="AND" asChild>
                        <NewRuleLink
                          text={`New AND rule`}
                          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                          locationId={location.id}
                          controllerId={controllerDevice.id}
                          type="AND"
                        />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <NewRuleLink
                          text={`New OR rule`}
                          className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                          locationId={location.id}
                          controllerId={controllerDevice.id}
                          type="OR"
                        />
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <div className="grid gap-4 xl:grid-cols-3 2xl:grid-cols-4">
                <DeviceCard device={controllerDevice} deviceType="Controller" />
                {devices
                  .filter(
                    (device) => device.controllerId === controllerDevice.id
                  )
                  .map((controlledDevice) => (
                    <DeviceCard
                      key={controlledDevice.id}
                      device={controlledDevice}
                      deviceType={getDeviceTypeById(
                        controlledDevice.deviceTypeId
                      )}
                    />
                  ))}
                {rules
                  .filter((rule) => rule.controllerId === controllerDevice.id)
                  .map((rule) => (
                    <RuleCard
                      key={rule.id}
                      rule={rule}
                      devices={getDevicesDetailsForRule(rule.devices)}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
