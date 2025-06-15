const express = require('express');
const bcrypt = require('bcrypt');
const db = require('../db/connection');
const router = express.Router();

router.post('/', async (req, res) => {
  const { username, password, email, firstName, lastName, address, phone, dob } = req.body;

  // Check for required fields
  if (!username || !password || !email || !firstName || !lastName || !address || !phone || !dob) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const [result] = await db.execute(
      `INSERT INTO users (username, password, email, firstName, lastName, address, phone, dob, isStaff)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0)`,
      [username, hashedPassword, email, firstName, lastName, address, phone, dob]
    );

    res.status(201).json({ message: 'User registered successfully!' });
  } catch (err) {
    console.error('Registration error:', err); 
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;