import {
  customers,
  devices,
  devicesRelations,
  deviceTypeRelations,
  deviceTypes,
  groupRelations,
  groups,
  locationRelations,
  locations,
  sessions,
  settings,
  settingsRelations,
  users,
} from "@/db/schema";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";

const pg = postgres(process.env.DATABASE_URL, { max: 1 });

export const db = drizzle(pg, {
  schema: {
    users,
    sessions,
    customers,
    locations,
    locationRelations,
    deviceTypes,
    deviceTypeRelations,
    groups,
    groupRelations,
    devices,
    devicesRelations,
    settings,
    settingsRelations,
  },
});
