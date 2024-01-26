import schedule from "node-schedule";
import WalletModel from "../models/wallet.js";
import { walletEnum } from "../app/enums/walletEnum.js";
import RabbitMQ from "../Queue/RabbitMQ.js";

const queue = new RabbitMQ("wallet");
export const scheduledJob = schedule.scheduleJob("* * * * * *", async () => {
  try {
    await queue.consume(async (parsedData) => {
      console.log(parsedData.userId);
      const wallet = await WalletModel.findOne({
        where: {
          userId: parsedData.userId,
        },
      });
      let data = {
        userId: parsedData.userId,
        balance:
          parsedData.type === walletEnum.WITHDRAW
            ? -parsedData.amount
            : +parsedData.amount,
      };
      if (wallet) {
        wallet.balance = +data.balance;
        console.log("update");
        await wallet.save();
      } else {
        console.log("create");
        await WalletModel.create(data);
      }
    });
  } catch (error) {
    console.error("Error querying wallet:", error);
  }
});
