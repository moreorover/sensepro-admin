"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Location } from "@/lib/schemas";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

interface Props {
  location: Location;
}

export function LocationCard({ location }: Props) {
  return (
    <Card className="flex flex-col h-full">
      <CardHeader>
        <CardTitle className="whitespace-nowrap overflow-hidden text-ellipsis">
          {location.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600">{location.name}</p>
        {/* <Badge variant={customer.status === 'Active' ? 'default' : 'secondary'} className="mt-2"> */}
        {/* {customer.status} */}
        {/* </Badge> */}
      </CardContent>
      <CardFooter className="flex flex-col mt-auto">
        {/* <Link
          className={buttonVariants({ className: "w-full mb-2" })}
          href={`/customers/edit/${location.id}`}
        >
          <Pencil className="mr-2 h-4 w-4" />
          Update
        </Link>
        <Link
          className={buttonVariants({
            variant: "secondary",
            className: "w-full",
          })}
          href={`/locations/new/${location.id}`}
        >
          <MapPin className="mr-2 h-4 w-4" />
          New Location
        </Link> */}
        <Link
          className={buttonVariants({
            variant: "link",
            className: "w-full",
          })}
          href={`/dashboard/locations/${location.id}`}
        >
          <ArrowUpRight className="mr-2 h-4 w-4" />
          View
        </Link>
      </CardFooter>
    </Card>
  );
}
