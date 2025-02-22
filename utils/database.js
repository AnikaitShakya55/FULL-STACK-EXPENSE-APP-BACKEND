const Sequelize = require("sequelize");

const sequelize = new Sequelize("mysql_database", "root", "Bhhuma@2000", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
