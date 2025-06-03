const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName, address, phone } = req.body;

  // Check for required fields
  if (!username || !password || !email || !firstName || !lastName || !address || !phone) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert the user into the database
    const [rows, fields] = await db.execute(
      `INSERT INTO users (username, password, email, firstName, lastName, address, phone, isStaff)
       VALUES (?, ?, ?, ?, ?, ?, ?, 0)`,
      [username, hashedPassword, email, firstName, lastName, address, phone]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err);  // This line helps you debug!
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;