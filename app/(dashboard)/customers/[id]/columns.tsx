"use client";

import { Button } from "@/components/ui/button";
import { client } from "@/lib/hono";
import { ColumnDef } from "@tanstack/react-table";
import { InferResponseType } from "hono";
import { ArrowUpDown } from "lucide-react";
import { TitleColumn } from "./title-column";
import { Actions } from "./actions";

export type ResponseType = InferResponseType<
  typeof client.api.locations.$get,
  200
>[0];

export const columns: ColumnDef<ResponseType>[] = [
  {
    accessorKey: "address",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Address
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      return (
        <TitleColumn locationId={row.original.id} address={row.original.address} />
      );
    },
  },
  {
    id: "actions",
    cell: ({ row }) => <Actions id={row.original.id} />,
  },
];
