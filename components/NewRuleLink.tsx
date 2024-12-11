"use client";

import { newRuleAtom } from "@/lib/atoms";
import { cn } from "@/lib/utils";
import { useSetAtom } from "jotai";
import Link from "next/link";

type Props = {
  text: string;
  className?: string;
  locationId: string;
  controllerId: string;
  type: "AND" | "OR";
};

export function NewRuleLink({
  text,
  className,
  locationId,
  controllerId,
  type,
}: Props) {
  const setNewRuleAtom = useSetAtom(newRuleAtom);
  return (
    <Link
      className={cn(className)}
      href="/rules/new"
      onClick={() => {
        setNewRuleAtom({ type, controllerId, locationId });
      }}
    >
      {text}
    </Link>
  );
}
