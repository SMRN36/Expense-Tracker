const sequelize = require("sequelize");
const db = require("../utils/database");

const expense = db.define("expenses", {
    id:{
        type:sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    category: sequelize.STRING,
    description: sequelize.STRING,
    amount: sequelize.INTEGER,
});

module.exports = expense;
