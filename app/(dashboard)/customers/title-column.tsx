import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type Props = {
  customerId: string;
  name: string;
};

export const TitleColumn = ({ customerId, name }: Props) => {
  const router = useRouter();

  const onClick = () => {
    router.push(`/customers/${customerId}`);
  };

  return (
    <>
      <Button variant="ghost" onClick={onClick}>
        {name}
      </Button>
    </>
  );
};
