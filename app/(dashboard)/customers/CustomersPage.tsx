"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useNewCustomers } from "@/features/customers/hooks/use-new-customer";
import { Progress } from "@radix-ui/react-progress";

export default function CustomersPage() {
  const newCustomer = useNewCustomers();
  return (
    <>
      <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-2 xl:grid-cols-2">
        <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4">
            <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
              <CardHeader className="pb-3">
                <CardTitle>Your Customers</CardTitle>
                <CardDescription className="max-w-lg text-balance leading-relaxed">
                  Introducing Our Dynamic Customers Dashboard for Seamless
                  Management and Insightful Analysis.
                </CardDescription>
              </CardHeader>
              <CardFooter>
                <Button onClick={newCustomer.onOpen}>
                  Create New Customer
                </Button>
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-1">
              <CardHeader className="pb-2">
                <CardDescription>This Week</CardDescription>
                <CardTitle className="text-4xl">+1</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +25% from last week
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={25} aria-label="25% increase" />
              </CardFooter>
            </Card>
            <Card x-chunk="dashboard-05-chunk-2">
              <CardHeader className="pb-2">
                <CardDescription>This Month</CardDescription>
                <CardTitle className="text-4xl">+10</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-xs text-muted-foreground">
                  +10% from last month
                </div>
              </CardContent>
              <CardFooter>
                <Progress value={12} aria-label="12% increase" />
              </CardFooter>
            </Card>
          </div>
          <Card x-chunk="dashboard-05-chunk-3">
            <CardHeader className="px-7">
              <CardTitle>Customers</CardTitle>
              <CardDescription>Registered customers.</CardDescription>
            </CardHeader>
            <CardContent>customers table</CardContent>
          </Card>
        </div>
      </main>
    </>
  );
}
