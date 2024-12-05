import { faker } from "@faker-js/faker";

faker.seed(628533);

// Helper function to generate unique IP addresses based on device type
const generateIp = (deviceType: string, index: number): string => {
  const baseIp = "192.168";
  if (deviceType === "controller") {
    return `${baseIp}.0.${index + 1}`;
  } else {
    return `${baseIp}.1.${index + 1}`;
  }
};

// Generate a device with a unique IP, serial number, and other details
const generateDevice = (deviceIndex: number, deviceType: string) => ({
  device: {
    name: `Device ${deviceIndex + 1}`,
    mac: faker.internet.mac(),
    ip: generateIp(deviceType, deviceIndex),
    serialNumber: faker.string.ulid(),
    deviceTypeId: deviceType,
  },
});

// Generate a controller with devices (allowing zero devices)
const generateController = (controllerIndex: number, deviceCount: number) => ({
  controller: {
    name: `Controller ${controllerIndex + 1}`,
    mac: faker.internet.mac(),
    ip: generateIp("controller", controllerIndex),
    serialNumber: faker.string.ulid(),
    deviceTypeId: "controller",
  },
  devices:
    deviceCount > 0
      ? Array.from({ length: deviceCount }, (_, i) => generateDevice(i, "cctv"))
      : [],
});

// Generate a location with controllers and devices
const generateLocation = (
  controllerCount: number,
  devicesPerController: number
) => ({
  location: { name: faker.location.city() },
  controllers: Array.from({ length: controllerCount }, (_, i) =>
    generateController(i, devicesPerController)
  ),
});

// Device brands and types
export const deviceBrands = [{ name: "Dahua" }, { name: "Raspberry Pi" }];

export const deviceTypes = [
  { id: "controller", name: "Controller" },
  { id: "nvr", name: "Network Video Recorder" },
  { id: "cctv", name: "CCTV Camera" },
  { id: "motion_sensor", name: "Motion Sensor" },
  { id: "light_strip", name: "Light Strip" },
];

// Customers with locations, controllers, and devices
export const customers = [
  {
    customer: {
      name: faker.person.fullName(),
    },
    locations: [generateLocation(2, 4), generateLocation(1, 4)],
  },
  {
    customer: {
      name: faker.person.fullName(),
    },
    locations: [generateLocation(2, 4)],
  },
  {
    customer: {
      name: faker.person.fullName(),
    },
    locations: [
      generateLocation(2, 4),
      generateLocation(1, 4),
      generateLocation(1, 0),
      generateLocation(1, 2),
    ],
  },
];
