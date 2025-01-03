"use client";

import { Table, Paper } from "@mantine/core";
import { Location } from "@/components/dashboard/locations/location.schema";

import { useRouter } from "next/navigation";

interface Props {
  locations: Location[];
}

export default function LocationsTable({ locations }: Props) {
  const router = useRouter();
  const rows = locations.map((location) => (
    <Table.Tr
      key={location.id}
      onClick={() => {
        router.push(`/dashboard/locations/${location.id}`);
      }}
    >
      <Table.Td>{location.id}</Table.Td>
      <Table.Td>{location.name}</Table.Td>
    </Table.Tr>
  ));
  return (
    <Paper shadow="xs" p="sm">
      <Table striped highlightOnHover>
        <Table.Thead>
          <Table.Tr>
            <Table.Th>ID</Table.Th>
            <Table.Th>Name</Table.Th>
          </Table.Tr>
        </Table.Thead>
        <Table.Tbody>{rows}</Table.Tbody>
      </Table>
    </Paper>
  );
}
