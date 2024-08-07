import { createId } from "@paralleldrive/cuid2";
import { PrismaClient } from "@prisma/client";
import { generateId, Scrypt } from "lucia";
const prisma = new PrismaClient();
async function main() {
  const passwordHash = await new Scrypt().hash("password");
  const testUser = await prisma.user.upsert({
    where: { email: "t@t.com" },
    update: {},
    create: {
      id: generateId(21),
      email: "t@t.com",
      hashedPassword: passwordHash,
    },
  });
  console.log({ testUser });

  const deviceTypes = await prisma.deviceType.createManyAndReturn({
    data: [
      { id: createId(), name: `Network Video Recorder ${createId()}` },
      { id: createId(), name: `CCTV Camera ${createId()}` },
      { id: createId(), name: `Raspberry Pi ${createId()}` },
      { id: createId(), name: `Detector ${createId()}` },
      { id: createId(), name: `LED Lights ${createId()}` },
    ],
  });

  const customerId = createId();
  const customer = await prisma.customers.create({
    data: { id: customerId, name: `Test ${customerId}` },
  });

  const location = await prisma.locations.create({
    data: { id: createId(), address: "PE1", customerId: customer.id },
  });

  const devices = await prisma.devices.createMany({
    data: [
      {
        id: createId(),
        name: "Device 1",
        ip: "127.0.0.1",
        mac: "12345678912345678",
        deviceTypeId: deviceTypes[0].id,
        pin: 1,
      },
      {
        id: createId(),
        name: "Device 2",
        ip: "127.0.0.1",
        mac: "12345678912345678",
        deviceTypeId: deviceTypes[0].id,
        pin: 2,
      },
    ],
  });
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
