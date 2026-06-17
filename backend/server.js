const express = require("express");
const cors = require("cors");
require("dotenv").config();

const connectDB = require("./config/db");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB connect
connectDB();

// Routes
app.use("/api/users", require("./routes/userRoutes"));

// Health check route (VERY useful on Render)
app.get("/", (req, res) => {
  res.send("Backend API is running");
});

// Use Render port or fallback to 5000 locally
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});