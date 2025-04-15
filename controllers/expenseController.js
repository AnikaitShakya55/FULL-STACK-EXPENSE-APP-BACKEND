const { where } = require("sequelize");
const Expenses = require("../models/Expenses.js");
const User = require("../models/User.js");
const sequelize = require("../utils/database.js");

const createExpense = async (req, res) => {
  console.log("req.user", req.user);
  try {
    const { title, description, amount, date } = req.body;
    console.log("req.body", req.body);
    await Expenses.create({
      title,
      description,
      amount,
      date,
      user_id: req.user.id,
    });
    return res.status(201).json({ message: "Expense Successfully Created" });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  console.log("get expense");
  try {
    const expenses = await Expenses.findAll();
    return res
      .status(200)
      .json({ data: expenses, message: "Expense Successfully Fetched" });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const getUserExpense = async (req, res) => {
  try {
    const expenses = await Expenses.findAll({
      where: {
        user_id: req.params.id,
      },
      // attributes: ["title", "description", "amount"],
    });

    return res.status(200).send({
      message: "Successfully Get Unique Expense according to user ",
      data: expenses,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Expenses.destroy({ where: { id: id } });

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
    const [updated] = await Expenses.update(
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
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

// output -> expense(user_id,totalamount)
// if u use sequelize functions u have to mark assosciations also in index.js
const premiumDashboard_sequelize_function = async (req, res) => {
  try {
    const userExpenses = await Expenses.findAll({
      attributes: [
        "user_id",
        [sequelize.fn("SUM", sequelize.col("amount")), "totalExpense"],
      ],
      include: [
        {
          model: User,
          attributes: ["name"],
        },
      ],
      group: ["user_id", "User.id"],
    });

    res.status(200).json({
      data: userExpenses,
      message: "User expenses fetched successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

const premiumDashboard_sequelize_query = async (req, res) => {
  try {
    const [userExpenses, metadata] = await sequelize.query(
      ` SELECT 
        Expenses.user_id, 
        Users.name, 
        SUM(Expenses.amount) AS totalExpense
      FROM Expenses
      JOIN Users ON Expenses.user_id = Users.id
      GROUP BY Expenses.user_id, Users.name`
    );

    res.status(200).json({
      data: userExpenses,
      message: "Successfully get Premium Leaderboard Data",
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createExpense,
  getExpenses,
  getUserExpense,
  deleteExpense,
  updateExpense,
  premiumDashboard_sequelize_query,
};
