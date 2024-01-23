"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Wallet extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Wallet.belongsTo(models.User, { foreignKey: "user_id", as: "owner" });
    }
  }
  Wallet.init(
    {
      user_id: DataTypes.INTEGER,
      balance: DataTypes.DECIMAL,
    },
    {
      sequelize,
      modelName: "Wallet",
    }
  );
  return Wallet;
};
