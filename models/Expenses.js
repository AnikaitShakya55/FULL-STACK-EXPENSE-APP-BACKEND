const { DataTypes } = require("sequelize");
const sequelize = require("../utils/database.js");

const Expenses = sequelize.define("Expenses", {
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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = Expenses;
