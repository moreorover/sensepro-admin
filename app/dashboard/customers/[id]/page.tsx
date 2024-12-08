import { buttonVariants } from "@/components/ui/button";
import { getCustomer } from "@/data-access/customer";
import { getLocationsByCustomerId } from "@/data-access/location";
import { auth } from "@/lib/auth";
import { PlusCircle } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import { LocationCard } from "../location-card";

type Props = {
  params: Promise<{ id: string }>;
};

export default async function CustomersPage({ params }: Props) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const { id } = await params;

  const customer = await getCustomer(id);

  if (!customer) {
    return redirect("/customers");
  }

  const locations = await getLocationsByCustomerId(id);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{customer.name}</h1>
        <Link
          className={buttonVariants()}
          href={`/locations/new/${customer.id}`}
        >
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Location
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {locations.map((location) => (
          <LocationCard key={location.id} location={location} />
        ))}
      </div>
    </div>
  );
}
