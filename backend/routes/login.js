const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Verify } = require('../middleware/verify');

//short-lived JWT
function generateAccessJWT(userID) {
  const secret = process.env.SECRET_ACCESS_TOKEN;
  if (!secret) {
    throw new Error('SECRET_ACCESS_TOKEN not configured');
  }
  return jwt.sign({ id: userID }, secret, { expiresIn: '2m' });
}

// POST /login
// Handles both web (via cookie) and mobile (via JSON token)
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // detect mobile clients (global express-useragent middleware)
  const isMobile = req.useragent?.isMobile === true;

  try {
    //looks up the user
    const [rows] = await db.execute(
      'SELECT userID, username, password FROM users WHERE username = ? OR email = ?',
      [username, username]
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'No account with those credentials.' });
    }

    //verifies password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'No account with those credentials.' });
    }

    //issues a JWT
    const token = generateAccessJWT(user.userID);
    console.log("Token sent to client:", token);

    if (isMobile) {
      // mobile client
      // return token in JSON payload
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        userID: user.userID,
        token: token
      });
      
    } else {
      // web client
      // set HttpOnly cookie
      res.cookie('SessionID', token, {
        maxAge: 2 * 60 * 1000,   // 2 minutes
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',           // set to `true` in production (HTTPS)
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
    user: req.user
  });
});

module.exports = router;
