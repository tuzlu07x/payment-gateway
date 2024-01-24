"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../src/sequelize.js";
class Transaction extends Model {
  static associate(models) {
    Transaction.belongsTo(models.Deposit, {
      foreignKey: "sender_wallet_id",
      as: "owner",
    });

    Transaction.belongsTo(models.Withdraw, {
      foreignKey: "receiver_wallet_id",
      as: "owner",
    });
  }
}

Transaction.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    receiver_wallet_id: DataTypes.INTEGER,
    amount: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

export default Transaction;
