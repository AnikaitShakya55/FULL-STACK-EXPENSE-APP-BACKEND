require("dotenv").config();
const cors = require("cors");
const sequelize = require("./utils/database.js");
const express = require("express");
const cookieParser = require("cookie-parser");
const User = require("./models/User.js");
const Expenses = require("./models/Expenses.js");
const app = express();

// middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
// api's
app.use("/expense_api", require("./routes/expenseRoutes.js"));
app.use("/user_api", require("./routes/userRoutes.js"));


// relations 
User.hasMany(Expenses, { foreignKey: "user_id" });
Expenses.belongsTo(User, { foreignKey: "user_id" });


// sql database connection :
sequelize.sync().then(() => {
  console.log("datbase connected");
});
app.listen(process.env.BACKEND_PORT, () => {
  console.log("Server Listen at Port : ", process.env.BACKEND_PORT);
});
