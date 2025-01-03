import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocations } from "@/data-access/location";
import LocationsPage from "@/components/dashboard/locations/LocationsPage";

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const locations = await getLocations();
  return <LocationsPage locations={locations} />;
}
