// const express = require("express");
// const router = express.Router();
// const expenseController = require("../controllers/expenseController");

// router.use(express.static("public"));

// router.get("/mainPage", expenseController.mainPage);

// router.get("/expenses", expenseController.getAllExpenses);

// router.delete("/expenses/:id", expenseController.deleteExpense);

// router.put("/expenses/:id", expenseController.editExpense);

// router.post("/expenses", expenseController.addExpense);

// module.exports = router;

const express = require("express");

const router = express.Router();



const userControllers = require("../controllers/expenseController");
router.get("/editExpense", userControllers.editExpense);

router.get("/deleteExpense", userControllers.deleteExpense);

router.get("/getExpenses", userControllers.getExpenses);

router.post("/newExpense", userControllers.postExpense);

router.get("/", userControllers.getExpensesPage);

module.exports = router;