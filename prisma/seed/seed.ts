import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { customers, deviceTypes } from "./data";

const prisma = new PrismaClient();

async function seedUsers() {
  const userEmail = "x@x.com";
  const existingUser = await prisma.user.findUnique({
    where: { email: userEmail },
  });

  if (!existingUser) {
    await auth.api.signUpEmail({
      body: {
        email: "x@x.com",
        password: "password123",
        name: "X",
      },
    });
  }
}

async function seedDeviceTypes() {
  for (const deviceType of deviceTypes) {
    await prisma.deviceType.upsert({
      where: { id: deviceType.id },
      update: {},
      create: deviceType,
    });
  }
}

async function seedCustomersAndLocations() {
  for (const customer of customers) {
    const createdCustomer = await prisma.customer.create({
      data: { ...customer.customer },
    });

    for (const location of customer.locations) {
      const createdLocation = await prisma.location.create({
        data: {
          ...location.location,
          customerId: createdCustomer.id,
        },
      });

      for (const controller of location.controllers) {
        const createdController = await prisma.device.create({
          data: {
            ...controller.controller,
            locationId: createdLocation.id,
          },
        });

        const createdDevices = [];

        for (const device of controller.devices) {
          const createdDevice = await prisma.device.create({
            data: {
              ...device.device,
              locationId: createdLocation.id,
              controllerId: createdController.id,
            },
          });

          createdDevices.push(createdDevice);
        }

        for (const rule of controller.rules) {
          const createdRule = await prisma.rule.create({
            data: {
              ...rule,
              controllerId: createdController.id,
              locationId: createdLocation.id,
            },
          });

          for (const createdDevice of createdDevices) {
            if (
              createdDevice.deviceTypeId === "cctv" ||
              createdDevice.deviceTypeId === "motion_sensor"
            ) {
              await prisma.ruleDevice.create({
                data: {
                  ruleId: createdRule.id,
                  deviceId: createdDevice.id,
                },
              });
            }
          }
        }
      }
    }
  }
}

async function main() {
  console.log("Seeding database...");

  await prisma.rule.deleteMany();
  await prisma.ruleDevice.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.device.deleteMany();
  await prisma.deviceType.deleteMany();

  await seedUsers();
  await seedDeviceTypes();
  await seedCustomersAndLocations();

  console.log("Database seeded successfully!");
}

main()
  .catch((error) => {
    console.error("Error seeding database:", error);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
