import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLocations } from "@/data-access/location";
import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import LocationRow from "./LocationRow";

export default async function LocationsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const locations = await getLocations();

  return (
    <div className="p-8 container">
      <h1 className="text-2xl">Locations List</h1>
      <Link href="/locations/new">New</Link>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>id</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Edit</TableHead>
            <TableHead>Delete</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {locations.map((location) => (
            <LocationRow key={location.id} location={location} />
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
