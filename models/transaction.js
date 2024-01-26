"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../src/sequelize.js";
class Transaction extends Model {
  static associate(models) {
    Transaction.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
  }
}

Transaction.init(
  {
    userId: {
      allowNull: false,
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    amount: DataTypes.DECIMAL,
    type: {
      type: DataTypes.ENUM,
      values: ["DEPOSIT", "WITHDRAW"],
    },
    isRead: DataTypes.BOOLEAN,
  },
  {
    sequelize,
    modelName: "Transaction",
  }
);

export default Transaction;
