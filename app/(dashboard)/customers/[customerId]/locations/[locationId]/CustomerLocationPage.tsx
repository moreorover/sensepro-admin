"use client";

import { GroupCard } from "@/components/group-card";
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
import { useNewGroup } from "@/features/groups/hooks/use-new-group";
import { useOpenGroup } from "@/features/groups/hooks/use-open-group";
import { useDeleteGroup, useGetGroups } from "@/features/groups/useGroupsApi";
import { useGetLocation } from "@/features/locations/useLocationsApi";
import { useConfirm } from "@/hooks/use-confirm";
import { Paths } from "@/lib/constants";
import { DeviceType } from "@prisma/client";
import { Progress } from "@radix-ui/react-progress";
import { ChevronRightIcon, Group, Loader2 } from "lucide-react";
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
  const openGroupEdit = useOpenGroup();

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this customer"
  );

  const isDisabled =
    customerQuery.isLoading ||
    customerQuery.isRefetching ||
    locationQuery.isLoading ||
    locationQuery.isRefetching ||
    groupsQuery.isLoading ||
    groupsQuery.isRefetching;

  const groupsLoading = groupsQuery.isLoading || groupsQuery.isRefetching;

  const groups = groupsQuery.data || [];

  const openNewDevice = (groupId: string, deviceType: DeviceType) => {
    newDevice.setLocationId(locationId);
    newDevice.setGroupId(groupId);
    newDevice.setDeviceType(deviceType);
    newDevice.onOpen();
  };

  const openNewGroup = () => {
    newGroup.setLocationId(locationId);
    newGroup.onOpen();
  };

  const handleGroupDelete = async (groupId: string) => {
    const deleteMutation = useDeleteGroup(groupId);
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
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
                    <span className="font-medium">New Group</span>
                  </div>
                  <ChevronRightIcon className="size-4" />
                </Button>
              </CardContent>
            </Card>
            {groups.map((group) => (
              <GroupCard {...group} />
            ))}
          </div>
        </div>
      </main>
    </>
  );
};
