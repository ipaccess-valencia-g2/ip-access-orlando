const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Verify } = require('../middleware/verify');

//short-lived JWT
function generateAccessJWT(userID) {
  return jwt.sign(
    { id: userID },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: '2m' }
  );
}

// --- POST /login/:username/:password
// use to encrypt passwords? const isMatch = await bcrypt.compare(inputPassword, storedHashedPassword);
router.post('/:username/:password', async (req,res) =>
{
    try
    {
        // Check that username is in the database
        const [userMatch] = await db.execute(
            'SELECT userID, username, password FROM users WHERE username = ?',
            [req.params.username]
        );
        if (userMatch.length === 0) {
            throw new Error('Username is incorrect');
        }

  // detect mobile clients (global express-useragent middleware)
  const isMobile = req.useragent?.isMobile === true;

        if (isMatch) {
            // Generate token (you can keep this if needed for future use)
            let options = {
                maxAge: 2 * 60 * 1000,
                httpOnly: true,
                secure: true,
                sameSite: "None",
            };
            const token = generateAccessJWT(userMatch[0].userID);
            res.cookie("SessionID", token, options);

            // Send userID and message to frontend
            res.status(200).json({
                status: "success",
                message: "You have successfully logged in.",
                userID: userMatch[0].userID  //  important for frontend
            });
        }
        else
        {
            res.json({ message: 'Incorrect password' });
        }
    }

    //issues a JWT
    const token = generateAccessJWT(user.userID);

    if (isMobile) {
      // mobile client
      // return token in JSON payload
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        userID: user.userID,
        token
      });
    } else {
      // web client
      // set HttpOnly cookie
      res.cookie('SessionID', token, {
        maxAge: 2 * 60 * 1000,   // 2 minutes
        httpOnly: true,
        secure: false,           // set to `true` in production (HTTPS)
        sameSite: 'Lax'
      });
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        userID: user.userID,
      });
    }

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// protected route for testing
router.get('/dashboard', Verify, (req, res) => {
  // req.user is set by Verify middleware
  res.status(200).json({
    status: 'success',
    message: 'Welcome to your dashboard!',
    user: req.user[0]
  });
});

module.exports = router;
