const User = require("../models/user.model");
const bcrypt = require("bcrypt");
const generateToken = require("../helper/generateToken");

const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const hashPassword = await bcrypt.hash(password, 10);

        const user = await User.create({
            name: name,
            email: email,
            password: hashPassword
        });

        res.status(201).send({
            success: true,
            token: generateToken(user._id),
            user
        });
    } catch (err) {
        console.error("error", err);
        res.status(500).send({
            success: false,
            message: "Registration failed",
            error: err.message,
        });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ success: false, message: "Invalid password" });
        }

        res.status(201).send({
            success: true,
            message: "Login successful",
            token: generateToken(user._id),
            user
        });
    } catch (err) {
        console.error("error", err);
        res.status(500).send({
            success: false,
            message: "login failed",
            error: err.message,
        });
    }
};

const logout = (req, res) => {
    res.status(200).json({
        success: true,
        message: "Logged out successfully"
    });
};

const profile = (req, res) => {
    res.json({ success: true, user: req.user });
};

module.exports = { register, login, logout, profile };
