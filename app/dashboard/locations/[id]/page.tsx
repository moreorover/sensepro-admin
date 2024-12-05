import { DeviceCard } from "@/components/DeviceCard";
import { buttonVariants } from "@/components/ui/button";
import { getDevicesByLocationId } from "@/data-access/device";
import { getLocation } from "@/data-access/location";
import { auth } from "@/lib/auth";
import { cn } from "@/lib/utils";
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

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <Link className={buttonVariants()} href={`/devices/new/${location.id}`}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Controller
        </Link>
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
                <Link
                  className={cn(
                    buttonVariants(),
                    "bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors"
                  )}
                  href={`/devices/new/${location.id}/${controllerDevice.id}`}
                >
                  <PlusCircle className="mr-2 h-4 w-4" />
                  Add Device
                </Link>
              </div>
              <div className="grid gap-4 2xl:grid-cols-2">
                <DeviceCard device={controllerDevice} isController={true} />
                {devices
                  .filter(
                    (device) => device.controllerId === controllerDevice.id
                  )
                  .map((controlledDevice) => (
                    <DeviceCard
                      key={controlledDevice.id}
                      device={controlledDevice}
                    />
                  ))}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
