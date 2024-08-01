import { deviceTypes } from "@/db/schema";
import { createId } from "@paralleldrive/cuid2";
import { config } from "dotenv";
import { drizzle } from "drizzle-orm/postgres-js";
import { migrate } from "drizzle-orm/postgres-js/migrator";
import postgres from "postgres";

config({ path: ".env.local" });

const pg = postgres(process.env.DATABASE_URL, { max: 1 });

const db = drizzle(pg);

const main = async () => {
  try {
    await migrate(db, { migrationsFolder: "drizzle" });
    console.log("Migration completed!");

    await db
      .insert(deviceTypes)
      .values([
        { id: createId(), name: "Network Video Recorder" },
        { id: createId(), name: "CCTV Camera" },
        { id: createId(), name: "Raspberry Pi" },
      ])
      .onConflictDoNothing();

    // console.log("Completed seeding.");
  } catch (error) {
    console.error("Error during migration: ", error);
    process.exit(1);
  }
  process.exit(0);
};

main();
