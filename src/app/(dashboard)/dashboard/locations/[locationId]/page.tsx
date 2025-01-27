import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getLocation } from "@/data-access/location";
import LocationPage from "@/components/dashboard/locations/LocationPage";
import { getLocationPageData } from "@/data-access/locationPage";

type Props = {
  params: Promise<{ locationId: string }>;
};

export default async function Page({ params }: Props) {
  const { locationId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const location = await getLocation(locationId);

  if (!location) {
    return redirect("/dashboard/locations");
  }

  const { customer, deviceGroups, deviceTypes } =
    await getLocationPageData(locationId);

  return (
    <LocationPage
      location={location}
      customer={customer!}
      deviceGroups={deviceGroups}
      deviceTypes={deviceTypes}
    />
  );
}
