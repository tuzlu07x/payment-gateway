import RabbitMQ from "../../Queue/RabbitMQ.js";
import transactionValidate from "../../validations/transactionValidation.js";

export class TransactionClass {
  constructor(amount, sender_wallet_id = null, receiver_wallet_id = null) {
    this.amount = amount;
    this.sender_wallet_id = sender_wallet_id;
    this.receiver_wallet_id = receiver_wallet_id;
  }

  customVal() {
    const validationResult = transactionValidate(this);
    if (validationResult.error) {
      throw new Error(validationResult.error);
    }
  }

  async createTransactionQueue() {
    this.customVal();
    try {
      const queue = new RabbitMQ("transaction");
      await queue.connection();
      await queue.createQueue();
      await queue.sendQueue(JSON.stringify(this));
      console.log(JSON.stringify(this));
      console.log("it went to queue!!!");
    } catch (error) {
      throw new Error(error);
    }
  }
}
