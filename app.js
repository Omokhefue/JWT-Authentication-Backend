require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const authRoutes = require("./routes/userRoutes");
const cookieParser = require("cookie-parser");

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(authRoutes);

mongoose
  .connect(process.env.DBURI)
  .then(() => app.listen(process.env.PORT || 3000, console.log("listening")))
  .catch((err) => {
    console.log(err);
  });
