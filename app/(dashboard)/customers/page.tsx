import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";
import CustomersPage from "./CustomersPage";

export default async function Customers() {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);

  return (
    <>
      <CustomersPage />
    </>
  );
}
