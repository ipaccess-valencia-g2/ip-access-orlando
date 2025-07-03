const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const { Verify } = require("../middleware/verify");

// JWT creation
const generateAccessJWT = (userID) => {
    return jwt.sign({ id: userID }, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '2m' });
};

// ✅ POST /login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const [users] = await db.execute(
            'SELECT userID, username, password FROM users WHERE username = ?',
            [username]
        );

        if (users.length === 0) {
            return res.status(401).json({ message: 'Username is incorrect' });
        }

        const isMatch = await bcrypt.compare(password, users[0].password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = generateAccessJWT(users[0].userID);

        res.cookie('SessionID', token, {
            maxAge: 2 * 60 * 1000,
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            userID: users[0].userID
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});

// ✅ Protected route: GET /api/dashboard
router.get('/dashboard', Verify, (req, res) => {
    res.status(200).json({
        status: 'success',
        message: 'Welcome to your dashboard!',
        user: req.user[0] // from verify.js
    });
});

module.exports = router;