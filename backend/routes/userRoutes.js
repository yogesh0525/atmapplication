const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  depositMoney,
  withdrawMoney,
  getBalance
} = require("../controllers/userController");

// REGISTER
router.post("/register", registerUser);

// LOGIN
router.post("/login", loginUser);

// DEPOSIT
router.put("/deposit", depositMoney);

// WITHDRAW
router.put("/withdraw", withdrawMoney);

// BALANCE
router.get("/balance/:accountNumber", getBalance);

module.exports = router;