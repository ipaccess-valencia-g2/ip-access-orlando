/// --- GET /locations

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /locations
router.get('/', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT locationID, name FROM locations ORDER BY name'
    );

    // mapping database to objects
    const locations = rows.map(row => ({
      locationID: row.locationID,
      name: row.name
    }));
	console.log(rows);

    res.json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
