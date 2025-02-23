const express = require("express");
const ExpenseController = require("../controllers/expenseController.js");

const router = express.Router();

router.post("/createExpense", ExpenseController.createExpense);
router.get("/getExpense", ExpenseController.getExpenses);
router.delete("/deleteExpense/:id", ExpenseController.deleteExpense);
router.put("/updateExpense/:id", ExpenseController.updateExpense);

module.exports = router;
