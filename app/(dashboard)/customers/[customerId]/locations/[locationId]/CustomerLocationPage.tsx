"use client";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetCustomer } from "@/features/customers/useCustomersApi";
import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { useGetDevices } from "@/features/devices/useDevicesApi";
import { useGetDeviceTypes } from "@/features/deviceTypes/useDeviceTypesApi";
import { useGetLocation } from "@/features/locations/useLocationsApi";
import { Paths } from "@/lib/constants";
import { Progress } from "@radix-ui/react-progress";
import { Loader2 } from "lucide-react";
import { redirect } from "next/navigation";
import { columns } from "./columns";

type Props = {
  customerId: string;
  locationId: string;
};

export const CustomerLocationPage = ({ customerId, locationId }: Props) => {
  const customerQuery = useGetCustomer(customerId);
  const locationQuery = useGetLocation(locationId);
  const devicesQuery = useGetDevices(locationId);
  const devicesTypesQuery = useGetDeviceTypes();
  const newDevice = useNewDevice();

  const isDisabled =
    customerQuery.isLoading ||
    customerQuery.isRefetching ||
    locationQuery.isLoading ||
    locationQuery.isRefetching ||
    devicesQuery.isLoading ||
    devicesQuery.isRefetching ||
    devicesTypesQuery.isLoading ||
    devicesTypesQuery.isRefetching;

  const devicesLoading = devicesQuery.isLoading || devicesQuery.isRefetching;

  const openNewDevice = () => {
    newDevice.setLocationId(locationId);
    newDevice.onOpen();
  };

  if (isDisabled) {
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

  if (!customerQuery.data || !locationQuery.data) {
    redirect(Paths.Customers);
  }

  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>{customerQuery.data.name}</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  <p>id: {customerQuery.data.id}</p>
                  <p>Address:</p>
                  <p>{locationQuery.data.address}</p>
                </CardDescription>
              </CardHeader>
              <CardFooter>
                {/* <Button>Create New Customer</Button> */}
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>Total devices</CardDescription>
                <CardTitle className="text-4xl">
                  {devicesQuery.data?.length}
                </CardTitle>
              </CardHeader>
              {/* <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent> */}
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">+10</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <div className="flex justify-between">
                <CardTitle>Devices</CardTitle>
                <Button onClick={openNewDevice}>Create New Device</Button>
              </div>
              <CardDescription>Location devices.</CardDescription>
            </CardHeader>
            <CardContent>
              {devicesLoading ? (
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
              ) : (
                <DataTable
                  filterLabel="Name"
                  filterKey="name"
                  columns={columns}
                  data={devicesQuery.data}
                  disabled={devicesLoading}
                />
              )}
            </CardContent>
          </Card>
        </div>
      </main>
    </>
  );
};
