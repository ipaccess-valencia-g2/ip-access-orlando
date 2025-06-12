const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /reservations/reasons
router.get('/', async (req, res) => {
  try {
    // Query distinct reasons from reservations table
    const [rows] = await db.query('SELECT DISTINCT reason FROM reservations');

    // Extract reasons into an array of strings
    const reasons = rows.map(row => row.reason);

    res.json({ reasons });
  } catch (error) {
    console.error('Error fetching reservation reasons:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;
