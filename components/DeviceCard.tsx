import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Device } from "@/lib/schemas";

interface DeviceCardProps {
  device: Device;
  isController?: boolean;
}

export function DeviceCard({ device, isController = false }: DeviceCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span>{device.name}</span>
          <Badge variant={isController ? "default" : "secondary"}>
            {isController ? "Controller" : "Controlled"}
          </Badge>
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
