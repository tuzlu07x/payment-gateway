import express from "express";
import { Sequelize } from "sequelize";
import { development } from "../config/config.js";
import bodyParser from "body-parser";
import { TransactionClass } from "./Payment/TransactionClass.js";
const app = express();

const sequelize = new Sequelize(development);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const transaction = new TransactionClass(5, 5, 5);
  transaction.createTransactionQueue();
  res.send("sea");
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized.");
  app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
});
