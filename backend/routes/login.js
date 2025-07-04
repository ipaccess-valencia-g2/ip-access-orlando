const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { Verify } = require('../middleware/verify');

// helper to generate a short-lived JWT
function generateAccessJWT(userID) {
  return jwt.sign(
    { id: userID },
    process.env.SECRET_ACCESS_TOKEN,
    { expiresIn: '2m' }
  );
}

// POST /login
// Handles both web (via cookie) and mobile (via JSON token) clients.
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  // detect mobile clients (express-useragent middleware must be applied globally)
  const isMobile = req.useragent?.isMobile === true;

  try {
    // 1) look up the user
    const [rows] = await db.execute(
      'SELECT userID, username, password FROM users WHERE username = ? OR email = ?',
      [username, username]
    );
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ message: 'No account with those credentials.' });
    }

    // 2) verify password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'No account with those credentials.' });
    }

    // 3) issue a JWT
    const token = generateAccessJWT(user.userID);

    if (isMobile) {
      // ─── MOBILE CLIENT ──────────────────────────────────────
      // return token in JSON payload
      return res.status(200).json({
        status: 'success',
        message: 'Login successful',
        userID: user.userID,
        token
      });
    } else {
      // ─── WEB CLIENT ─────────────────────────────────────────
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
        userID: user.userID
      });
    }

  } catch (err) {
    console.error('Login error:', err);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
});

// optional protected route for testing
router.get('/dashboard', Verify, (req, res) => {
  // req.user is set by your Verify middleware
  res.status(200).json({
    status: 'success',
    message: 'Welcome to your dashboard!',
    user: req.user[0]
  });
});

module.exports = router;
