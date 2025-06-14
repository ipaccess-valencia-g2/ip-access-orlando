const express = require('express');
const db = require('../db');
const router = express.Router();

// GET /history/:userId - Fetch usage history for a user
router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const [rows] = await db.execute(
      'SELECT * FROM usage_history WHERE userID = ?',
      [userId]
    );

    res.status(200).json(rows);
  } catch (err) {
    console.error('Error fetching usage history:', err);
    res.status(500).json({ error: 'Something went wrong.' });
  }
});

module.exports = router;