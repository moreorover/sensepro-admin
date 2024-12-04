"use client";
import { TableCell, TableRow } from "@/components/ui/table";
import { Location } from "@/lib/schemas";
import { Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";

type Props = {
  location: Location;
};

export default function LocationRow({ location }: Props) {
  const router = useRouter();

  const handleClickEdit = () => {
    router.push(`/location/edit/${location.id}`);
  };

  const handleClickDelete = () => {
    router.push(`/location/delete/${location.id}`);
  };

  return (
    <TableRow>
      <TableCell>{location.id}</TableCell>
      <TableCell>{location.name}</TableCell>
      <TableCell onClick={handleClickEdit}>
        <Pencil />
      </TableCell>
      <TableCell onClick={handleClickDelete}>
        <Trash />
      </TableCell>
    </TableRow>
  );
}
