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
import { Separator } from "@/components/ui/separator";
import { useOpenDevice } from "@/features/devices/hooks/use-open-device";
import { useDeleteDevice } from "@/features/devices/useDevicesApi";
import { useConfirm } from "@/hooks/use-confirm";
import { DeviceShemaType } from "@/lib/apiSchema";
import { Copy, MoreHorizontal } from "lucide-react";

export const DeviceCard = (props: DeviceShemaType) => {
  const openDeviceEdit = useOpenDevice();
  const deleteMutation = useDeleteDevice(props.id);

  const [ConfirmDialog, confirm] = useConfirm(
    "Are you sure?",
    "You are about to delete this customer"
  );

  const handleDeviceDelete = async () => {
    const ok = await confirm();

    if (ok) {
      deleteMutation.mutate();
    }
  };

  return (
    <>
      <ConfirmDialog />
      <Card className="overflow-hidden">
        <CardHeader className="flex flex-row items-start bg-muted/50">
          <div className="grid gap-0.5">
            <CardTitle className="group flex items-center gap-2 text-lg">
              {props.deviceType}
              <Button
                size="icon"
                variant="outline"
                className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Copy className="h-3 w-3" />
                <span className="sr-only">Copy Device Details</span>
              </Button>
            </CardTitle>
            <CardDescription>Updated: November 23, 2023</CardDescription>
          </div>
          <div className="ml-auto flex items-center gap-1">
            {/* <Button size="sm" variant="outline" className="h-8 gap-1">
            <RefreshCwIcon className="h-3.5 w-3.5" />
            <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
            Refresh
            </span>
            </Button> */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="icon" variant="outline" className="h-8 w-8">
                  {/* <MoveVerticalIcon className="h-3.5 w-3.5" /> */}
                  <MoreHorizontal className="size-4" />
                  <span className="sr-only">More</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  onClick={() => openDeviceEdit.onOpen(props.id)}
                >
                  Edit
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleDeviceDelete()}>
                  Delete
                </DropdownMenuItem>
                {/* <DropdownMenuItem>Export</DropdownMenuItem> */}
                {/* <DropdownMenuSeparator /> */}
                {/* <DropdownMenuItem>Decommission</DropdownMenuItem> */}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </CardHeader>
        <CardContent className="p-6 text-sm">
          <div className="grid gap-3">
            {/* <div className="font-semibold">Device Details</div> */}
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Device Name</span>
                <span>{props.name}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">IP Address</span>
                <span>{props.ip}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">MAC Address</span>
                <span>{props.mac}</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Serial Number</span>
                <span>{props.serialNumber}</span>
              </li>
            </ul>
            <Separator className="my-2" />
            <ul className="grid gap-3">
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Last Seen</span>
                <span>2 hours ago</span>
              </li>
              <li className="flex items-center justify-between">
                <span className="text-muted-foreground">Status</span>
                <span className="font-semibold text-green-500">Online</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex flex-row items-center border-t bg-muted/50 px-6 py-3">
          <div className="text-xs text-muted-foreground">
            Last updated <time dateTime="2023-11-23">November 23, 2023</time>
          </div>
          {/* <Pagination className="ml-auto mr-0 w-auto">
          <PaginationContent>
          <PaginationItem>
          <Button size="icon" variant="outline" className="h-6 w-6">
          <ChevronLeftIcon className="h-3.5 w-3.5" />
          <span className="sr-only">Previous Device</span>
          </Button>
          </PaginationItem>
          <PaginationItem>
          <Button size="icon" variant="outline" className="h-6 w-6">
          <ChevronRightIcon className="h-3.5 w-3.5" />
          <span className="sr-only">Next Device</span>
          </Button>
          </PaginationItem>
          </PaginationContent>
          </Pagination> */}
        </CardFooter>
      </Card>
    </>
  );
};