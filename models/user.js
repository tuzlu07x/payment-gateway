"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../src/sequelize.js";

class User extends Model {
  static associate(models) {
    User.hasOne(models.Transaction, {
      foreignKey: "userId",
      as: "transaction",
    });
    User.hasOne(models.Wallet, {
      foreignKey: "userId",
      as: "wallet",
    });
  }
}
User.init(
  {
    name: DataTypes.STRING,
  },
  {
    sequelize,
    modelName: "User",
  }
);
export default User;
