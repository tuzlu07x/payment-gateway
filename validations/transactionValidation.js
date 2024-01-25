import Joi from "joi";

export default function transactionValidation(transaction) {
  const schema = Joi.object({
    userId: Joi.number().required(),
    amount: Joi.number().positive().required(),
    type: Joi.string().valid("DEPOSIT", "WITHDRAW"),
  });

  return schema.validate(transaction);
}
