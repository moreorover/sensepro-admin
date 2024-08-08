import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";
import { customers, deviceTypes, locations } from "./data";

const prisma = new PrismaClient();

await prisma.user.upsert({
  where: {
    email: "t@t.com",
  },
  create: {
    id: createId(),
    email: "t@t.com",
    hashedPassword: "password",
  },
  update: {
    email: "t@t.com",
    hashedPassword:
      "26c8aa91b05fe486256f00bca556d635:5d84e5a4972548c97dd8853245b76719fd19c665ed8441d5cdf35e7eb1f47264ee4a84f80a7eb21201b3814005a89b71ea5a50dd9970a10e884cc45716d4ccca",
  },
});

await prisma.deviceType.deleteMany({
  where: {},
});

for (const deviceType of deviceTypes) {
  await prisma.deviceType.create({
    data: {
      ...deviceType,
    },
  });
}

await prisma.customer.deleteMany({
  where: {},
});

for (const customer of customers) {
  await prisma.customer.create({
    data: {
      ...customer,
    },
  });

  for (const location of locations) {
    await prisma.location.create({
      data: {
        id: createId(),
        address: location.address,
        customerId: customer.id,
      },
    });
  }
}
