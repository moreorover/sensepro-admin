import { auth } from "@/lib/auth";
import { PrismaClient } from "@prisma/client";
import { customers, deviceTypes, locations } from "./data";

const prisma = new PrismaClient();

const user = await prisma.user.findFirst({ where: { email: "t@t.com" } });

if (!user) {
  await auth.api.signUpEmail({
    body: {
      email: "x@x.com",
      password: "password123",
      name: "X",
    },
  });
}

for (const deviceType of deviceTypes) {
  await prisma.deviceType.upsert({
    where: { id: deviceType.id },
    update: {},
    create: {
      ...deviceType,
    },
  });
}

await prisma.customer.deleteMany({
  where: {},
});

for (const customer of customers) {
  const c = await prisma.customer.upsert({
    where: { name: customer.name },
    update: {},
    create: {
      ...customer,
    },
  });

  for (const location of locations) {
    await prisma.location.create({
      data: {
        ...location,
        customerId: c.id,
      },
    });
  }
}
