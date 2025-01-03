import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getCustomer } from "@/data-access/customer";
import CustomerPage from "@/components/dashboard/customers/CustomerPage";
import { getLocationsByCustomerId } from "@/data-access/location";

type Props = {
  params: Promise<{ customerId: string }>;
};

export default async function Page({ params }: Props) {
  const { customerId } = await params;

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/");
  }

  const customer = await getCustomer(customerId);

  if (!customer) {
    return redirect("/dashboard/customers");
  }

  const locations = await getLocationsByCustomerId(customerId);

  return <CustomerPage customer={customer} locations={locations} />;
}
