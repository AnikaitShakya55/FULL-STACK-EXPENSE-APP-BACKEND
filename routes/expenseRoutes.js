const express = require("express");
const ExpenseController = require("../controllers/expenseController.js");
const isAuthenticated = require("../middlewares/auth.js");

const router = express.Router();

router.post("/createExpense", isAuthenticated, ExpenseController.createExpense);
router.get("/getExpenses", ExpenseController.getExpenses);
router.get("/getUserExpense/:id", ExpenseController.getUserExpense);
router.delete("/deleteExpense/:id", ExpenseController.deleteExpense);
router.put("/updateExpense/:id", ExpenseController.updateExpense);
router.get(
  "/premiumDashboard",
  ExpenseController.premiumDashboard_sequelize_query
);

module.exports = router;
