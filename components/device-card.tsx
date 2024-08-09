/**
 * v0 by Vercel.
 * @see https://v0.dev/t/fmCCuPJH4ig
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
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
import { DeviceShemaType } from "@/lib/apiSchema";
import { MoreHorizontal } from "lucide-react";

export const DeviceCard = (props: DeviceShemaType) => {
  return (
    <Card className="overflow-hidden">
      <CardHeader className="flex flex-row items-start bg-muted/50">
        <div className="grid gap-0.5">
          <CardTitle className="group flex items-center gap-2 text-lg">
            Device Information
            <Button
              size="icon"
              variant="outline"
              className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
            >
              <CopyIcon className="h-3 w-3" />
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
              <DropdownMenuItem>Edit</DropdownMenuItem>
              <DropdownMenuItem>Delete</DropdownMenuItem>
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
              <span>192.168.1.100</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">MAC Address</span>
              <span>00:11:22:33:44:55</span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-muted-foreground">Serial Number</span>
              <span>ABC123456789</span>
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
  );
};

function CopyIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
      <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
    </svg>
  );
}
