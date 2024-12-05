import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { getDevicesByLocationId } from "@/data-access/device";
import { getLocation } from "@/data-access/location";
import { auth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
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
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {devices.map((device) => (
          <Card key={device.id} className="w-full">
            <CardHeader>
              <CardTitle>{device.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">ID</TableCell>
                    <TableCell>{device.id}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">MAC</TableCell>
                    <TableCell>{device.mac}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">IP</TableCell>
                    <TableCell>{device.ip}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Serial Number</TableCell>
                    <TableCell>{device.serialNumber}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Created At</TableCell>
                    <TableCell>{device.createdAt.toLocaleString()}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Updated At</TableCell>
                    <TableCell>
                      {device.updatedAt
                        ? device.updatedAt.toLocaleString()
                        : "N/A"}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Location ID</TableCell>
                    <TableCell>{device.locationId || "N/A"}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Device Type ID
                    </TableCell>
                    <TableCell>{device.deviceTypeId}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">Controller ID</TableCell>
                    <TableCell>{device.controllerId || "N/A"}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-4">
                <Badge variant="outline" className="mr-2">
                  {device.controllerId ? "Controlled Device" : "Controller"}
                </Badge>
                {device.locationId && (
                  <Badge variant="outline">Has Location</Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
