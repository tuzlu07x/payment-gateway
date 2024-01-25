import express from "express";
import sequelize from "./sequelize.js";
import bodyParser from "body-parser";
import { TransactionClass } from "./Payment/TransactionClass.js";
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

app.get("/", (req, res) => {
  const transaction = new TransactionClass(1, 50, "WITHDRAW");
  transaction.createTransactionQueue();
  res.send("sea");
});

sequelize.sync({ force: true }).then(() => {
  console.log("Database synchronized.");
  app.listen(3000, () => {
    console.log("Server is running on port 3000.");
  });
});
