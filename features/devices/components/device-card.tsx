import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DeviceShemaType } from "@/lib/apiSchema";
import { Copy } from "lucide-react";
import { DeviceEditButton } from "./device-edit-button";

export const DeviceCard = (props: DeviceShemaType) => {
  return (
    <>
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
            <DeviceEditButton deviceId={props.id} />
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
