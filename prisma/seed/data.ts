import { faker } from "@faker-js/faker";
import { createId } from "@paralleldrive/cuid2";

export const deviceTypes = [
  { id: createId(), name: "Controller" },
  { id: createId(), name: "Network Video Recorder" },
  { id: createId(), name: "CCTV Camera" },
  { id: createId(), name: "Detector" },
];

export const customers = [
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
  { id: createId(), name: faker.person.fullName() },
];

export const locations = [
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
  { address: faker.location.streetAddress() },
];
