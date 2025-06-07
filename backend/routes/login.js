const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');

const generateAccessJWT = function (userID)
{
    let payload =
        {
            id: userID,
        };
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '2m' });
};

// --- POST /login/:username/:password
// use to encrypt passwords? const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
router.post('/login/:username/:password', async (req,res) =>
{
    try
    {
        // Check that username is in the database
        const [userMatch] = await db.execute(
            'SELECT * FROM users WHERE username = ?',
            [req.params.username]
        );
        if (userMatch.length === 0) {
            throw new Error('Username is incorrect');
        }

        // Check that password is correct
         const isMatch = await bcrypt.compare(req.params.password, userMatch[0].password);

        if (isMatch)
        {
            //res.json({ message: 'Logging in...' });

            // Generate token for user
            let options =
                {
                    maxAge: 2 * 60 * 1000,
                    httpOnly: true,
                    secure: true,
                    sameSite: "None",
                };
            const token = generateAccessJWT(userMatch[0].userID);
            res.cookie("SessionID", token, options);
            res.status(200).json({
                status: "success",
                message: "You have successfully logged in."
            });
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

router.get('/login/:username', verify, (req, res) =>
{
    res.status(200).json(
        {
            status: "success",
            message: "Welcome to your Dashboard!"
        });
});

module.exports = router;