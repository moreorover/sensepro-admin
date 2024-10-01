import { env } from "@/env";
import amqp from "amqplib";
import { v4 as uuidv4 } from "uuid";

export async function notifyRaspberryPi(
  deviceId: string,
  action: string,
  payload: string
) {
  const connection = await amqp.connect(env.MQ_URL);
  const channel = await connection.createConfirmChannel(); // Create confirm channel
  const queue = `raspberry-pi-${deviceId}`;

  await channel.assertQueue(queue, { durable: true });

  const message = {
    id: uuidv4(), // Unique message ID
    action: action,
    payload: payload,
  };

  // Send the message and wait for confirmation from RabbitMQ
  channel.sendToQueue(
    queue,
    Buffer.from(JSON.stringify(message)),
    {},
    (err, ok) => {
      if (err) {
        console.error("Message could not be delivered");
      } else {
        console.log("Message delivered successfully to RabbitMQ");
      }
    }
  );

  // Ensure all confirms are received
  await channel.waitForConfirms();
  await channel.close();
  await connection.close();
}
