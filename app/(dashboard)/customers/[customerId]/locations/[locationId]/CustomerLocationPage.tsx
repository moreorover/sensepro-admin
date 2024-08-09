"use client";

import { DeviceCard } from "@/components/device-card";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useGetCustomer } from "@/features/customers/useCustomersApi";
import { useNewDevice } from "@/features/devices/hooks/use-new-device";
import { useNewGroup } from "@/features/groups/hooks/use-new-group";
import { useGetGroups } from "@/features/groups/useDevicesApi";
import { useGetLocation } from "@/features/locations/useLocationsApi";
import { Paths } from "@/lib/constants";
import { Progress } from "@radix-ui/react-progress";
import {
  Cctv,
  ChevronRightIcon,
  Group,
  Loader2,
  MoreHorizontal,
  Radar,
  TowerControl,
} from "lucide-react";
import { redirect } from "next/navigation";

type Props = {
  customerId: string;
  locationId: string;
};

export const CustomerLocationPage = ({ customerId, locationId }: Props) => {
  const customerQuery = useGetCustomer(customerId);
  const locationQuery = useGetLocation(locationId);
  const groupsQuery = useGetGroups(locationId);
  const newDevice = useNewDevice();
  const newGroup = useNewGroup();

  const isDisabled =
    customerQuery.isLoading ||
    customerQuery.isRefetching ||
    locationQuery.isLoading ||
    locationQuery.isRefetching ||
    groupsQuery.isLoading ||
    groupsQuery.isRefetching;

  const groupsLoading = groupsQuery.isLoading || groupsQuery.isRefetching;

  const groups = groupsQuery.data || [];

  const openNewDevice = (groupId: string) => {
    newDevice.setLocationId(locationId);
    newDevice.setGroupId(groupId);
    newDevice.onOpen();
  };

  const openNewGroup = () => {
    newGroup.setLocationId(locationId);
    newGroup.onOpen();
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
                  {groupsQuery.data?.reduce(
                    (total, group) => total + group.devices.length,
                    0
                  )}
                </CardTitle>
              </CardHeader>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>Manage Location</CardDescription>
              </CardHeader>
              <CardContent className="grid gap-4">
                <Button
                  onClick={openNewGroup}
                  variant="outline"
                  className="flex items-center justify-between rounded-md bg-muted p-4 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-4">
                    <Group className="size-4" />
                    <span className="font-medium">Group</span>
                  </div>
                  <ChevronRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-between rounded-md bg-muted p-4 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-4">
                    <TowerControl className="size-4" />
                    <span className="font-medium">Controller</span>
                  </div>
                  <ChevronRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-between rounded-md bg-muted p-4 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-4">
                    <Cctv className="size-4" />
                    <span className="font-medium">CCTV Camera</span>
                  </div>
                  <ChevronRightIcon className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  className="flex items-center justify-between rounded-md bg-muted p-4 hover:bg-accent hover:text-accent-foreground"
                >
                  <div className="flex items-center gap-4">
                    <Radar className="size-4" />
                    <span className="font-medium">Detector</span>
                  </div>
                  <ChevronRightIcon className="size-4" />
                </Button>
              </CardContent>
            </Card>
            {groups.map((group) => (
              <Card key={group.id} className="col-span-4">
                <CardHeader className="flex flex-row items-start bg-muted/50">
                  <div className="grid gap-0.5">
                    <CardTitle className="group flex items-center gap-2 text-lg">
                      {group.name}
                    </CardTitle>
                    <CardDescription>
                      Updated: November 23, 2023
                    </CardDescription>
                  </div>
                  <div className="ml-auto flex items-center gap-1">
                    <Button size="sm" onClick={() => openNewDevice(group.id)}>
                      Add Device
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-8 w-8"
                        >
                          {/* <MoveVerticalIcon className="h-3.5 w-3.5" /> */}
                          <MoreHorizontal className="size-4" />
                          <span className="sr-only">More</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit</DropdownMenuItem>
                        <DropdownMenuItem>Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 pt-4">
                  {group.devices.map((device) => (
                    <DeviceCard key={device.id} {...device} />
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
