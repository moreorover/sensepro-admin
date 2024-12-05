import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getDeviceTypes } from "@/data-access/deviceType";
import { auth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";

export default async function DeviceTypesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const deviceTypes = await getDeviceTypes();
  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Device Types</h1>
        <Link className={buttonVariants()} href="/device-types/new">
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Device Type
        </Link>
      </div>
      <Table>
        <TableCaption>A list of device types.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">id</TableHead>
            <TableHead>Name</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {deviceTypes.map((deviceType) => (
            <TableRow key={deviceType.id}>
              <TableCell>{deviceType.id}</TableCell>
              <TableCell className="font-medium">{deviceType.name}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
