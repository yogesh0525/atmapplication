const User = require("../models/User");


// Register User
const registerUser = async (req, res) => {

    try {

        const { accountNumber, name, pin } = req.body;

        const exist = await User.findOne({ accountNumber });

        if (exist) {
            return res.status(400).json({
                message: "Account already exists"
            });
        }

        const user = await User.create({
            accountNumber,
            name,
            pin
        });

        res.status(201).json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Login
const loginUser = async (req, res) => {

    try {

        const { accountNumber, pin } = req.body;

        const user = await User.findOne({
            accountNumber,
            pin
        });

        if (!user) {

            return res.status(400).json({
                message: "Invalid Account Number or PIN"
            });

        }

        res.json(user);

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


// Deposit
const depositMoney = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body;
        const user = await User.findOne({ accountNumber });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        user.balance += Number(amount);
        user.transactions.push({ type: "Deposit", amount: Number(amount) });

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Withdraw
const withdrawMoney = async (req, res) => {
    try {
        const { accountNumber, amount } = req.body;
        const user = await User.findOne({ accountNumber });
        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (user.balance < amount) {
            return res.status(400).json({
                message: "Insufficient Balance"
            });
        }

        user.balance -= Number(amount);
        user.transactions.push({ type: "Withdraw", amount: Number(amount) });

        await user.save();
        res.json(user);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};


// Check Balance
const getBalance = async (req, res) => {

    try {

        const user = await User.findOne({
            accountNumber: req.params.accountNumber
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found"
            });

        }

        res.json({
            accountNumber: user.accountNumber,
            name: user.name,
            balance: user.balance
        });

    } catch (error) {

        res.status(500).json({
            message: error.message
        });

    }

};


module.exports = {
    registerUser,
    loginUser,
    depositMoney,
    withdrawMoney,
    getBalance
};