/// --- GET /reasons

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /reasons
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT reasonID, label FROM reasons ORDER BY reasonID'
    );

    // mapping database to objects
    const reasons = rows.map(row => ({
      reasonID: row.reasonID,
      label: row.label
    }));
	console.log(rows);

    res.json({ reasons });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
