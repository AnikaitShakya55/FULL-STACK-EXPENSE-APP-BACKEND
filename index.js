require("dotenv").config();
const cors = require("cors");
const sequelize = require("./utils/database.js");
const express = require("express");
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// api's
app.use("/expense_api", require("./routes/expenseRoutes.js"));
app.use('/user_api',require('./routes/userRoutes.js'))

// sql database connection :
sequelize.sync().then(()=>{
  console.log("datbase connected")
})
app.listen(process.env.BACKEND_PORT, () => {
  console.log("Server Listen at Port : ", process.env.BACKEND_PORT);
});
