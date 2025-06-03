const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// GET /admin
router.get('/', (req, res) => {
    res.send('Admin Dashboard');
});

// GET /users/
router.get('/users/', async (req, res) =>
{
    try
    {
        // Get all users
        const [rows] = await db.promise().query('SELECT * FROM users');

        res.json({rows});
    }
    catch (error)
    {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /users/:userID
router.get('/users/:userID', async (req, res) =>
{
    try
    {
        // Get user by userID
        const [userInfo] = await db.promise().query(`SELECT * FROM users WHERE userID = ${req.params.userID}`);

        // Output the user info
        res.json({userInfo});
    }
    catch (error)
    {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /users/:userID/:column/:value
router.put('/users/:userID/:column/:value', async (req, res) =>
{
    try
    {
        // If the column is password, hash the new password
        if (req.params.column === 'password')
        {
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.params.value, 10);

            // Update user password by userID
            await db.promise().query(`UPDATE users SET password = '${hashedPassword}' WHERE userID = ${req.params.userID}`);
        }
        else
        {
            // Update user info by userID
            await db.promise().query(`UPDATE users SET ${req.params.column} = ${req.params.value} WHERE userID = ${req.params.userID}`);
        }

        // Save new user info for display
        const [newUser] = await db.promise().query(`SELECT * FROM users WHERE userID = ${req.params.userID}`);

        // Display new user info
        res.json({ message: 'User updated: ', newUser });
    }
    catch (error)
    {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
})

module.exports = router;