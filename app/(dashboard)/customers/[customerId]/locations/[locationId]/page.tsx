import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import { CustomerLocationPage } from "./CustomerLocationPage";

export default async function CustomerLocation({
  params,
}: {
  params: { customerId: string; locationId: string };
}) {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);

  return (
    <>
      <CustomerLocationPage
        customerId={params.customerId}
        locationId={params.locationId}
      />
    </>
  );
}
