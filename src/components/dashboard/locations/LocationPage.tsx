"use client";

import {
  Button,
  Grid,
  GridCol,
  Group,
  Menu,
  Paper,
  SimpleGrid,
  Title,
} from "@mantine/core";
import { PageContainer } from "@/components/page_container/PageContainer";
import { useSetAtom } from "jotai";
import { editLocationDrawerAtom } from "@/components/dashboard/locations/location.atom";
import { Location } from "@/components/dashboard/locations/location.schema";
import { Customer } from "@/components/dashboard/customers/customer.schema";
import DeviceCard from "@/components/dashboard/devices/DeviceCard";
import {
  Device,
  DeviceType,
} from "@/components/dashboard/devices/device.schema";
import { newDeviceDrawerAtom } from "@/components/dashboard/devices/device.atom";

interface Props {
  location: Location;
  customer: Customer;
  deviceGroups: {
    controllerId: string;
    controller: Device;
    devices: Device[];
  }[];
  deviceTypes: DeviceType[];
}

export default function LocationPage({
  location,
  customer,
  deviceGroups,
  deviceTypes,
}: Props) {
  const showNewDeviceDrawer = useSetAtom(newDeviceDrawerAtom);
  const showEditLocationDrawer = useSetAtom(editLocationDrawerAtom);

  return (
    <PageContainer title={`${customer.name} / ${location.name}`}>
      <Grid>
        <GridCol span={{ sm: 12, md: 12, lg: 12 }}>
          <Paper
            style={{
              display: "flex",
              justifyContent: "flex-end",
              width: "100%",
            }}
          >
            <Group>
              <Button
                onClick={() => {
                  showNewDeviceDrawer({
                    isOpen: true,
                    locationId: location.id!,
                    deviceTypeId: "controller",
                    controllerId: null,
                  });
                }}
              >
                Add Controller
              </Button>
              <Button
                onClick={() => {
                  showEditLocationDrawer({ isOpen: true, location });
                }}
              >
                Edit
              </Button>
            </Group>
          </Paper>
        </GridCol>
        {deviceGroups.map((deviceGroup) => (
          <GridCol
            key={deviceGroup.controllerId}
            span={{ sm: 12, md: 12, lg: 12 }}
          >
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
                <Title
                  order={4}
                >{`${deviceGroup.controller.name} Devices`}</Title>
                <Menu>
                  <Menu.Target>
                    <Button>Add Device</Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Label>Device Types</Menu.Label>
                    {deviceTypes.map((deviceType) => (
                      <Menu.Item
                        disabled={
                          (!!deviceGroup.controllerId &&
                            deviceType.id === "controller") ||
                          (!deviceGroup.controllerId &&
                            deviceType.id !== "controller")
                        }
                        key={deviceType.id}
                        onClick={() => {
                          showNewDeviceDrawer({
                            isOpen: true,
                            locationId: location.id!,
                            deviceTypeId: deviceType.id!,
                            controllerId: deviceGroup.controllerId
                              ? deviceGroup.controllerId
                              : null,
                          });
                        }}
                      >
                        {deviceType.name}
                      </Menu.Item>
                    ))}
                  </Menu.Dropdown>
                </Menu>
              </div>
              <SimpleGrid cols={{ base: 1, md: 3 }}>
                <DeviceCard
                  device={deviceGroup.controller}
                  isDeleteEnabled={deviceGroup.devices.length == 0}
                />
                {deviceGroup.devices.map((device) => (
                  <DeviceCard key={device.id} device={device} />
                ))}
              </SimpleGrid>
            </Paper>
          </GridCol>
        ))}
      </Grid>
    </PageContainer>
  );
}
