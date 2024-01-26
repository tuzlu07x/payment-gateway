"use strict";
import { Model, DataTypes } from "sequelize";
import sequelize from "../src/sequelize.js";
class Wallet extends Model {
  static associate(models) {
    Wallet.belongsTo(models.User, { foreignKey: "userId", as: "owner" });
  }
}
Wallet.init(
  {
    userId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    balance: DataTypes.DECIMAL,
  },
  {
    sequelize,
    modelName: "Wallet",
  }
);
export default Wallet;
