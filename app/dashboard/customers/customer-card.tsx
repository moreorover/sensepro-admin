"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Customer } from "@/lib/schemas";
import { MapPin, Pencil } from "lucide-react";
import Link from "next/link";

interface Props {
  customer: Customer;
}

export function CustomerCard({ customer }: Props) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis">
          {customer.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{customer.name}</p>
        {/* <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className="mt-2"> */}
        {/* {customer.status} */}
        {/* </Badge> */}
      </CardContent>
      <CardFooter className="flex flex-col mt-auto">
        <Link
          className={buttonVariants({ className: "w-full mb-2" })}
          href={`/customers/edit/${customer.id}`}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </Link>
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
          href={`/locations/new/${customer.id}`}
        >
          <MapPin className="mr-2 h-4 w-4" />
          New Location
        </Link>
      </CardFooter>
    </Card>
  );
}
