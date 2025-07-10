const express = require('express');
const router = express.Router();
const db = require('../db/connection');

// ------------------------------------
// GET /locations
// ------------------------------------
router.get('/', async (req, res) => {
  try {
    // ✅ Pull the full address instead of just ZIP
    const [rows] = await db.execute(
      'SELECT locationID, name, address FROM locations ORDER BY name'
    );

    const locations = rows.map(row => ({
      locationID: row.locationID,
      name: row.name,
      address: row.address, // ✅ Include full address!
      zip: row.address ? row.address.slice(-5) : null  // ✅ Still get zip if you want it
    }));

    console.log('Fetched locations:', locations);

    res.json({ locations });
  } catch (error) {
    console.error('Error fetching locations:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
