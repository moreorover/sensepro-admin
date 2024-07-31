import { Button } from "@/components/ui/button";
import { validateRequest } from "@/lib/auth/validate-request";
import { Paths } from "@/lib/constants";
import { redirect } from "next/navigation";

export default async function Dashbboard() {
  const { user } = await validateRequest();

  if (!user) redirect(Paths.Login);

  return <Button>Home: {user.email}</Button>;
}
