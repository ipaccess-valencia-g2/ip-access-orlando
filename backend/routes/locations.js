/// --- GET /locations

const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// GET /locations
router.get('/locations', async (req, res) => {
  try {
    const [rows] = await db.execute(
      'SELECT locationID, locationName FROM locations ORDER BY locationName'
    );

    // mapping database to objects
    const locations = rows.map(row => ({
      locationId: row.locationID,
      name: row.locationName
    }));

    res.json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
