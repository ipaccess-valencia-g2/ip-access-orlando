const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const verify = require('../middleware/verify');
const {Verify} = require("../middleware/verify");

const generateAccessJWT = function (userID)
{
    let payload =
        {
            id: userID
        };
    return jwt.sign(payload, process.env.SECRET_ACCESS_TOKEN, { expiresIn: '2m' });
};

// --- POST /login/:username/:password
// use to encrypt passwords? const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
router.post('/login/', async (req, res) =>
{
    const { username, password } = req.body;

    try 
    {
    // Check that username is in the database
    const [userMatch] = await db.execute(
        'SELECT userID, username, password FROM users WHERE username = ?',
        [username]
    );
    if (userMatch.length === 0) {
        throw new Error('Username is incorrect');
    }

    // Check that password is correct
    const isMatch = await bcrypt.compare(password, userMatch[0].password);

    if (isMatch)
    {
        const options = {
            maxAge: 2 * 60 * 1000, // 2 minutes
            httpOnly: true,
            secure: false,
            sameSite: 'Lax'
        };

        const token = generateAccessJWT(userMatch[0].userID);
        res.cookie('SessionID', token, options);

        res.status(200).json({
            status: 'success',
            message: 'You have successfully logged in.',
            userID: userMatch[0].userID
            //pulls the userID for console messages later
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

router.get('/login/:username', Verify, (req, res) =>
{
    res.status(200).json(
        {
            status: "success",
            message: "Welcome to your Dashboard!"
        });
});

module.exports = router;