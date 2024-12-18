"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Check, Copy } from "lucide-react";
import { useState } from "react";

type Props = {
  text: string;
  variant?: "icon" | "full";
  className?: string;
};

export default function CopyButton({
  text,
  variant = "icon",
  className = "",
}: Props) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  const buttonContent =
    variant === "icon" ? (
      copied ? (
        <Check className="h-4 w-4" />
      ) : (
        <Copy className="h-4 w-4" />
      )
    ) : copied ? (
      "Copied!"
    ) : (
      "Copy"
    );

  const buttonProps =
    variant === "icon"
      ? {
          variant: "ghost" as const,
          size: "icon" as const,
          className: `h-6 w-6 p-0 ${className}`,
          "aria-label": "Copy",
        }
      : {
          className: `mt-4 w-full ${className}`,
        };

  return (
    <TooltipProvider>
      <Tooltip open={copied}>
        <TooltipTrigger asChild>
          <Button onClick={copyToClipboard} {...buttonProps}>
            {buttonContent}
          </Button>
        </TooltipTrigger>
        {/* <TooltipContent>
          <p>{copied ? "Copied!" : "Copy"}</p>
        </TooltipContent> */}
      </Tooltip>
    </TooltipProvider>
  );
}
