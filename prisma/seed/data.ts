import { faker } from "@faker-js/faker";

faker.seed(628533);

export const deviceBrands = [{ name: "Dahua" }, { name: "Raspberry Pi" }];

export const deviceTypes = [
  { id: "controller", name: "Controller" },
  { id: "nvr", name: "Network Video Recorder" },
  { id: "cctv", name: "CCTV Camera" },
  { id: "motion_sensor", name: "Motion Sensor" },
  { id: "light_strip", name: "Light Strip" },
];

export const customers = [
  { name: faker.person.fullName() },
  { name: faker.person.fullName() },
  { name: faker.person.fullName() },
  { name: faker.person.fullName() },
];

export const locations = [
  { name: faker.location.city() },
  { name: faker.location.city() },
  { name: faker.location.city() },
  { name: faker.location.city() },
  { name: faker.location.city() },
  { name: faker.location.city() },
];
