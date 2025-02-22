const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const Expense = sequelize.define("Expense", {
  title: { type: DataTypes.STRING, allowNull: false },
  description: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
});

module.exports = Expense;
