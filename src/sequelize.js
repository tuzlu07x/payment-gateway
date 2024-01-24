import { Sequelize } from "sequelize";
import { development } from "../config/config.js";

const sequelize = new Sequelize(development);

export default sequelize;
