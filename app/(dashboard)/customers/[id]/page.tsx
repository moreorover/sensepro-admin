import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import { CustomerPage } from "./CustomerPage";

export default async function Customers({
  params,
}: {
  params: { id: string };
}) {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);

  return (
    <>
      <CustomerPage customerId={params.id} />
    </>
  );
}
