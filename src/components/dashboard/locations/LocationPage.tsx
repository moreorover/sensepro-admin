"use client";

import { Button, Grid, GridCol, Paper, Title } from "@mantine/core";
import { PageContainer } from "@/components/page_container/PageContainer";
import { useSetAtom } from "jotai";
import {
  editLocationDrawerAtom,
  newLocationDrawerAtom,
} from "@/components/dashboard/locations/location.atom";
import { Location } from "@/components/dashboard/locations/location.schema";
import { Customer } from "@/components/dashboard/customers/customer.schema";

interface Props {
  location: Location;
  customer: Customer;
}

export default function LocationPage({ location, customer }: Props) {
  const showNewLocationDrawer = useSetAtom(newLocationDrawerAtom);
  const showEditLocationDrawer = useSetAtom(editLocationDrawerAtom);
  return (
    <PageContainer title={location.name}>
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
                showEditLocationDrawer({ isOpen: true, location });
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
              <Title order={4}>Devices</Title>
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
            {/*<SimpleOrdersTable orders={orders} />*/}
          </Paper>
        </GridCol>
      </Grid>
    </PageContainer>
  );
}
