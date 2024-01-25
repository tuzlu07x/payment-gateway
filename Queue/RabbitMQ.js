import amqp from "amqplib";
import { rabbitMqConfig } from "../config/config.js";

export default class RabbitMQ {
  constructor(queueName) {
    this.queueName = queueName;
  }
  async connection() {
    console.log("connection works");
    const connection = await amqp.connect(rabbitMqConfig);
    return connection;
  }

  async channel() {
    console.log("channel works");
    const channel = await (await this.connection()).createChannel();
    return channel;
  }

  async createQueue() {
    console.log("queue works");
    const queue = await (
      await this.channel()
    ).assertQueue(this.queueName, { durable: false });
    return queue;
  }

  async sendQueue(message) {
    console.log("sendQueue works");
    (await this.channel()).sendToQueue(this.queueName, Buffer.from(message));
  }

  async consume(callback) {
    const channel = await this.channel();
    channel.consume(this.queueName, async (msg) => {
      try {
        if (callback && typeof callback === "function") {
          const parsedData = JSON.parse(msg.content.toString());
          await callback(parsedData);
          await this.acknowledge();
        }
      } catch (error) {
        console.error("Error processing message:", error.message);
        channel.nack(msg, false, false);
      }
    });
  }

  async acknowledge(msg) {
    const channel = await this.channel();
    await channel.ack(msg);
  }
}
