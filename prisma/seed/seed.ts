/**
 * ! Executing this script will delete all data in your database and seed it with 10 user.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { copycat } from "@snaplet/copycat";
import { createSeedClient } from "@snaplet/seed";
import { Scrypt } from "lucia";

const main = async () => {
  const seed = await createSeedClient();

  // Truncate all tables in the database
  await seed.$resetDatabase();

  const passwordHash = await new Scrypt().hash("password");

  const { user } = await seed.user((x) =>
    x(1, {
      id: (ctx) => copycat.uuid(ctx.seed),
      email: "t@t.com",
      hashedPassword: passwordHash,
    })
  );

  // Seed the database with 10 user
  await seed.user((x) =>
    x(10, {
      id: (ctx) => copycat.uuid(ctx.seed),
      email: (ctx) =>
        copycat.email(ctx.seed, {
          domain: "t.com",
        }),
    })
  );

  const { deviceType } = await seed.deviceType((createManyAndReturn) =>
    createManyAndReturn(5, {
      id: (ctx) => copycat.uuid(ctx.seed),
      name: (ctx) => copycat.word(ctx.seed),
    })
  );

  const { customer } = await seed.customer(
    (x) =>
      x(10, {
        id: (ctx) => copycat.uuid(ctx.seed),
        name: (ctx) => copycat.fullName(ctx.seed),
        locations: (x) =>
          x(10, {
            id: (ctx) => copycat.uuid(ctx.seed),
            address: (ctx) => copycat.city(ctx.seed),
            devices: (x) =>
              x(10, {
                id: (ctx) => copycat.uuid(ctx.seed),
                mac: (ctx) => copycat.mac(ctx.seed),
                ip: "",
                pin: (ctx) => copycat.int(ctx.seed, { min: 1, max: 12 }),
                name: (ctx) => copycat.word(ctx.seed),
              }),
          }),
      }),
    { connect: { deviceType } }
  );

  // Type completion not working? You might want to reload your TypeScript Server to pick up the changes

  console.log("Database seeded successfully!");

  process.exit();
};

main();
