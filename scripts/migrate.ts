import {
  customers,
  devices,
  devicesRelations,
  deviceTypeRelations,
  deviceTypes,
  locations,
  sessions,
  settings,
  users,
} from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import { generateId, Scrypt } from "lucia";
import postgres from "postgres";

config({ path: ".env.local" });

const pg = postgres(process.env.DATABASE_URL, { max: 1 });

const db = drizzle(pg, {
  schema: {
    users,
    sessions,
    customers,
    locations,
    settings,
    deviceTypes,
    devices,
    deviceTypeRelations,
    devicesRelations,
  },
});

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed!");

    const passwordHash = await new Scrypt().hash("password");

    const userId = generateId(21);

    const [data] = await db
      .insert(users)
      .values({
        id: userId,
        email: "t@t.com",
        hashedPassword: passwordHash,
      })
      .returning()
      .onConflictDoNothing();

    const deviceTypesDb = await db
      .insert(deviceTypes)
      .values([
        { id: createId(), name: `Network Video Recorder ${createId()}` },
        { id: createId(), name: `CCTV Camera ${createId()}` },
        { id: createId(), name: `Raspberry Pi ${createId()}` },
        { id: createId(), name: `Detector ${createId()}` },
        { id: createId(), name: `LED Lights ${createId()}` },
      ])
      .returning()
      .onConflictDoNothing();

    const customerId = createId();
    const [customer] = await db
      .insert(customers)
      .values([{ id: customerId, name: `Test ${customerId}` }])
      .returning()
      .onConflictDoNothing();

    const [location] = await db
      .insert(locations)
      .values([{ id: createId(), address: "PE1", customerId: customer.id }])
      .returning()
      .onConflictDoNothing();

    const device = await db
      .insert(devices)
      .values([
        {
          id: createId(),
          name: "Device 1",
          deviceTypeId: deviceTypesDb[0].id,
          locationId: location.id,
        },
      ])
      .returning()
      .onConflictDoNothing();

    console.log("Completed seeding.");
  } catch (error) {
    console.error("Error during migration: ", error);
    process.exit(1);
  }
  process.exit(0);
};

main();
