import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Device } from "@/lib/schemas";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

interface DeviceCardProps {
  device: Device;
  deviceType: string;
}

export function DeviceCard({ device, deviceType }: DeviceCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{device.name}</span>
          <Badge variant={device.controllerId ? "secondary" : "default"}>
            {deviceType}
          </Badge>
          <Link
            href={`/devices/edit/${device.id}`}
            className={buttonVariants({ size: "sm" })}
          >
            Edit
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <dl className="grid gap-2 text-sm">
          <div>
            <dt className="font-medium">MAC:</dt>
            <dd>{device.mac}</dd>
          </div>
          <div>
            <dt className="font-medium">IP:</dt>
            <dd>{device.ip}</dd>
          </div>
          <div>
            <dt className="font-medium">Serial:</dt>
            <dd>{device.serialNumber}</dd>
          </div>
          <div>
            <dt className="font-medium">Created:</dt>
            <dd>{device.createdAt?.toLocaleDateString()}</dd>
          </div>
        </dl>
      </CardContent>
    </Card>
  );
}
