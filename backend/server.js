const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB connect
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});