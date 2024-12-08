"use client";

import { newDeviceAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import Link from "next/link";

type Props = {
  text: string;
  className?: string;
  locationId: string;
  controllerId: string | null;
  deviceType: string;
};

export function NewDeviceLink({
  text,
  className,
  locationId,
  controllerId,
  deviceType,
}: Props) {
  const setNewDeviceAtom = useSetAtom(newDeviceAtom);
  return (
    <Link
      className={cn(className)}
      href="/devices/new"
      onClick={() => {
        setNewDeviceAtom({ locationId, controllerId, deviceType });
      }}
    >
      {text}
    </Link>
  );
}
