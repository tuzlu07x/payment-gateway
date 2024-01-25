import schedule from "node-schedule";
import TransactionModel from "../models/transaction.js";
import RabbitMQ from "../Queue/RabbitMQ.js";

export const scheduledJob = schedule.scheduleJob("* * * * * *", async () => {
  try {
    const rabbit = new RabbitMQ("transaction");
    await rabbit.consume(async (parsedData) => {
      console.log(parsedData);
      try {
        const transaction = new TransactionModel(parsedData);
        await transaction.save();
        console.log(parsedData.length);
        console.log("data created successfully:", parsedData);
      } catch (error) {
        console.error("there is an error:", error);
      }
    });
  } catch (error) {
    throw new Error(error);
  }
});
