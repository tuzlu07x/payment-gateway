const express = require("express");
const { Sequelize } = require("sequelize");
const config = require("../config/config");

const app = express();
const sequelize = new Sequelize(config.development);

app.use(express.json());

sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized.");
  app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
});
