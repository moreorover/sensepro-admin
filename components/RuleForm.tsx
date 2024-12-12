"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Rule, ruleSchema } from "@/lib/schemas";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createRule, updateRule } from "@/data-access/rule";
import { useToast } from "@/hooks/use-toast";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

type Props = {
  rule: Rule;
  className?: string;
};

export default function RuleForm({ rule, className }: Props) {
  const router = useRouter();
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);

  const form = useForm<Rule>({
    resolver: zodResolver(ruleSchema),
    defaultValues: {
      ...rule,
    },
  });

  async function onSubmit(values: Rule) {
    setSubmitting(true);
    const response = rule.id
      ? await updateRule(values)
      : await createRule(values);
    setSubmitting(false);

    if (response.type === "ERROR") {
      toast({
        variant: "destructive",
        description: response.message,
      });
    } else {
      toast({
        variant: "default",
        description: response.message,
      });
      router.back();
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className={cn("space-y-2", className)}
      >
        <FormField
          control={form.control}
          name="locationId"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel>Location ID</FormLabel>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="controllerId"
          render={({ field }) => (
            <FormItem className="sr-only">
              <FormLabel>Controller ID</FormLabel>
              <FormControl>
                <Input type="hidden" {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        {rule.id && (
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem className="sr-only">
                <FormLabel>ID</FormLabel>
                <FormControl>
                  <Input type="hidden" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
        )}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Rule Type</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Rule Type" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="AND">AND</SelectItem>
                  <SelectItem value="OR">OR</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={submitting}>
          {submitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {rule.id ? "Updating..." : "Creating..."}
            </>
          ) : (
            "Submit"
          )}
        </Button>
      </form>
    </Form>
  );
}
