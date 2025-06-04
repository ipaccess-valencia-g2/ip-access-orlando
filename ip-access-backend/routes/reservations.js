const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /reservations?userID=1
router.get('/', async (req, res) => {
  const userID = req.query.userID;

  if (!userID) {
    return res.status(400).json({ error: 'Missing userID parameter.' });
  }

  try {
    const [rows] = await db.execute(
      `SELECT * FROM reservations WHERE userID = ?`,
      [userID]
    );
    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;