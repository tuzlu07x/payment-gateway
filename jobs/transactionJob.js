import schedule from "node-schedule";
import TransactionModel from "../models/transaction.js";
import RabbitMQ from "../Queue/RabbitMQ.js";

const rabbit = new RabbitMQ("transaction");
export const scheduledJob = schedule.scheduleJob("* * * * * *", async () => {
  try {
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
