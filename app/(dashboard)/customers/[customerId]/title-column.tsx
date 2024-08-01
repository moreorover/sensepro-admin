import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  locationId: string;
  address: string;
  customerId?: string | null;
};

export const TitleColumn = ({ locationId, address, customerId }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/customers/${customerId}/locations/${locationId}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={onClick}>
        {address}
      </Button>
    </>
  );
};
