const { where } = require("sequelize");
const Expense = require("../models/Expenses");

const createExpense = async (req, res) => {
  try {
    const { title, description, amount, date } = req.body;
    const expense = await Expense.create({ title, description, amount, date });
    return res.status(201).json({ message: "Expense Successfully Created" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    return res
      .status(200)
      .json({ data: expenses, message: "Expense Successfully Fetched" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expense.destroy({ where: { id: id } });

    if (deleted) {
      return res.status(200).json({ message: "Expense deleted successfully" });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Expense.update(
      {
        title: req.body.title,
        description: req.body.description,
        amount: req.body.amount,
        date: req.body.date,
      },
      { where: { id: id } }
    );

    if (!updated) {
      return res.status(404).json({ message: "Expense not found" });
    }
    return res.status(200).json({ message: "Expense Updated Successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  deleteExpense,
  updateExpense,
};
