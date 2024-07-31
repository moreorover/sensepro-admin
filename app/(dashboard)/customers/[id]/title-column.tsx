import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  locationId: string;
  address: string;
};

export const TitleColumn = ({ locationId, address }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/locations/${locationId}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={onClick}>
        {address}
      </Button>
    </>
  );
};
