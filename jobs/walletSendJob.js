import schedule from "node-schedule";
import { Op } from "sequelize";
import TransactionModel from "../models/transaction.js";
import RabbitMQ from "../Queue/RabbitMQ.js";

const queue = new RabbitMQ("wallet");
export const scheduledJob = schedule.scheduleJob("* * * * * *", async () => {
  const twentyFourHoursAgo = new Date();
  twentyFourHoursAgo.setHours(twentyFourHoursAgo.getHours() - 24);

  try {
    const transactions = await TransactionModel.findAll({
      where: {
        createdAt: {
          [Op.gte]: twentyFourHoursAgo,
        },
        isRead: null,
      },
      attributes: ["id", "userId", "amount", "type"],
    });

    if (transactions.length > 0) {
      const dataValues = transactions.map((item) => item.dataValues);

      transactions.map(async (item) => {
        await queue.connection();
        await queue.createQueue();
        await queue.sendQueue(JSON.stringify(item.dataValues));
      });
      const transactionIds = dataValues.map((item) => item.id);

      TransactionModel.update(
        { isRead: 1 },
        {
          where: {
            id: transactionIds,
          },
        }
      );

      console.log("Data sent to the queue and updated successfully.");
    } else {
      console.log("No data.");
    }
  } catch (error) {
    console.error("Error querying transactions:", error);
  }
});
