import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Device } from "@prisma/client";
import {
  Activity,
  Camera,
  Clock,
  Edit,
  Lightbulb,
  Network,
  Wifi,
} from "lucide-react";
import Link from "next/link";
import CopyButton from "./CopyButton";

type Props = {
  device: Device;
  deviceType: string;
};

export function DeviceCard({ device, deviceType }: Props) {
  const getDeviceIcon = (deviceTypeId: string) => {
    switch (deviceTypeId) {
      case "controller":
        return <Network className="h-5 w-5" />;
      case "nvr":
        return <Activity className="h-5 w-5" />;
      case "cctv":
        return <Camera className="h-5 w-5" />;
      case "motion_sensor":
        return <Activity className="h-5 w-5" />;
      case "light_strip":
        return <Lightbulb className="h-5 w-5" />;
    }
  };

  return (
    <Card className="w-full hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getDeviceIcon(device.deviceTypeId)}
            <span>{device.name}</span>
          </div>
          <Badge variant={device.controllerId ? "secondary" : "default"}>
            {deviceType}
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="space-y-2 text-sm">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex items-center space-x-2">
                  <Wifi className="h-4 w-4 text-muted-foreground" />
                  <dt className="font-medium text-muted-foreground">MAC:</dt>
                  <dd className="font-mono">{device.mac}</dd>
                </div>
              </TooltipTrigger>
              <TooltipContent>
                <p>Media Access Control address</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <div className="flex items-center space-x-2">
            <Network className="h-4 w-4 text-muted-foreground" />
            <dt className="font-medium text-muted-foreground">IP:</dt>
            <dd className="font-mono">{device.ip}</dd>
            <CopyButton text={device.ip} />
          </div>
          <div className="flex items-center space-x-2">
            <Activity className="h-4 w-4 text-muted-foreground" />
            <dt className="font-medium text-muted-foreground">Serial:</dt>
            <dd className="font-mono">{device.serialNumber}</dd>
          </div>
          <div className="flex items-center space-x-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <dt className="font-medium text-muted-foreground">Created:</dt>
            <dd>{device.createdAt?.toLocaleDateString()}</dd>
          </div>
        </dl>
      </CardContent>
      <CardFooter className="pt-2">
        <Button asChild size="sm" className="w-full">
          <Link href={`/devices/edit/${device.id}`}>
            <Edit className="mr-2 h-4 w-4" />
            Edit Device
          </Link>
        </Button>
      </CardFooter>
    </Card>
  );
}
