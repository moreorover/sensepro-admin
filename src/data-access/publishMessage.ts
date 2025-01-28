"use server";

import "server-only";

import amqp from "amqplib";

export async function publishMessage(queue: string, message: string) {
  let connection;
  let channel;

  try {
    // Step 1: Create a connection
    connection = await amqp.connect(process.env.RABBITMQ_URL as string);

    // Step 2: Create a channel
    channel = await connection.createChannel();

    // Step 3: Assert the queue (ensures the queue exists)
    await channel.assertQueue(queue, { durable: true, maxLength: 1 });

    // Step 4: Send the message to the queue
    channel.sendToQueue(queue, Buffer.from(message));
    console.log(`Message sent to queue "${queue}"`);

    // Step 5: Close the channel and connection
  } catch (error) {
    console.error("Failed to send message:", error);
  } finally {
    if (channel) await channel.close();
    if (connection) await connection.close();
  }
}
