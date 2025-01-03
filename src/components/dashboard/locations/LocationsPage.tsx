"use client";

import { Button, Grid, GridCol, Paper } from "@mantine/core";
import { Location } from "@/components/dashboard/locations/location.schema";
import { PageContainer } from "@/components/page_container/PageContainer";
import LocationsTable from "@/components/dashboard/locations/LocationsTable";

interface Props {
  locations: Location[];
}

export default function LocationsPage({ locations }: Props) {
  return (
    <PageContainer title="Locations">
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
              disabled
              // onClick={() => {
              //   showNewLocationDrawer({ isOpen: true, customerId: ""});
              // }}
            >
              New
            </Button>
          </Paper>
        </GridCol>
        <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
          <LocationsTable locations={locations} />
        </GridCol>
      </Grid>
    </PageContainer>
  );
}
