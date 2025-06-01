const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcrypt");

// --- POST /login/:username/:password
// use to encrypt passwords? const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
router.post('/login/:username/:password', async (req,res) =>
{
    try
    {
        // Check that username is in the database
        const userMatch = await db.promise().query(`SELECT username,password FROM users WHERE username = '${req.params.username}'`);
        if (userMatch[0][0] === undefined)
        {
            throw new Error('Username is incorrect');
        }

        // Check that password is correct
        const isMatch = await bcrypt.compare(req.params.password, userMatch[0][0].password);

        if (isMatch)
        {
            res.json({ message: 'Logging in...' });
        }
        else
        {
            res.json({ message: 'Incorrect password' });
        }
    }
    catch (error)
    {
        console.error('Error validating user:', error);
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;