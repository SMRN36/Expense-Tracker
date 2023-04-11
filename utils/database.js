const sequelize = require("sequelize");

const db = new sequelize("expense_tracker", "root", "Mysql@simran",{
    dialect: "mysql",
    host: "localhost",
});

module.exports = db;

