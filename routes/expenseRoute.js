const express = require("express");
const router = express.Router();
const expenseController = require("../controllers/expenseController");

router.use(express.static("public"));

router.get("/mainPage", expenseController.mainPage);

router.get("/getAllExpenses", expenseController.getAllExpense);

router.get("/deleteExpense/:id", expenseController.deleteExpense);

router.post("/editExpense/:id", expenseController.editExpense);

router.post("/addExpense", expenseController.addExpense);

router.get("/editExpense/:id", expenseController.editExpense);
module.exports = router;




