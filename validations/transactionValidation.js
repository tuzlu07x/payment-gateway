import Joi from "joi";

export default function transactionValidation(transaction) {
  const schema = Joi.object({
    amount: Joi.number().positive().required(),
    sender_wallet_id: Joi.number(),
    receiver_wallet_id: Joi.number(),
  });

  return schema.validate(transaction);
}
