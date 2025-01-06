"use client";

import { Button, Grid, GridCol, Paper, Title } from "@mantine/core";
import { PageContainer } from "@/components/page_container/PageContainer";
import { useSetAtom } from "jotai";
import { editCustomerDrawerAtom } from "@/components/dashboard/customers/customer.atom";
import { Customer } from "@/components/dashboard/customers/customer.schema";
import { Location } from "@/components/dashboard/locations/location.schema";
import LocationsTable from "@/components/dashboard/locations/LocationsTable";
import { newLocationDrawerAtom } from "@/components/dashboard/locations/location.atom";

interface Props {
  customer: Customer;
  locations: Location[];
}

export default function CustomerPage({ customer, locations }: Props) {
  const showEditCustomerDrawer = useSetAtom(editCustomerDrawerAtom);
  const showNewLocationDrawer = useSetAtom(newLocationDrawerAtom);
  return (
    <PageContainer title={customer.name}>
      <Grid>
        <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
          <Paper
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Button
              onClick={() => {
                showEditCustomerDrawer({ isOpen: true, customer });
              }}
            >
              Edit
            </Button>
          </Paper>
        </GridCol>
        <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
          <Paper
            style={{
              padding: "16px",
              borderRadius: "8px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "16px",
              }}
            >
              <Title order={4}>Locations</Title>
              <Button
                onClick={() => {
                  showNewLocationDrawer({
                    isOpen: true,
                    customerId: customer.id!,
                  });
                }}
              >
                New
              </Button>
            </div>
            <LocationsTable locations={locations} />
          </Paper>
        </GridCol>
      </Grid>
    </PageContainer>
  );
}
