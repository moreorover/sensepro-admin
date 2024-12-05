import { buttonVariants } from "@/components/ui/button";
import { getControllersByLocationId } from "@/data-access/device";
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

  const controllers = await getControllersByLocationId(location.id);

  return (
    <div className="container mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{location.name}</h1>
        <Link className={buttonVariants()} href={`/devices/new/${location.id}`}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Add New Controller
        </Link>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
        {controllers.map((controller) => (
          // <LocationCard key={location.id} location={location} />
          <></>
        ))}
      </div>
    </div>
  );
}
