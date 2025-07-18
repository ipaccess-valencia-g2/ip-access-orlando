// Admin Routes Information
// (requires logged-in user with isStaff=true)
// POST /admin                         - admin login (optional)            ✓
// GET  /admin/users                   - list all users                    ✓
// GET  /admin/users/:userId           - view a single user                ✓
// PUT  /admin/users/:userId/:column/:value - update a user field          ✓
// GET  /admin/reservations            - list all reservations             !
// GET  /admin/reservations/:reservationID - list all reservations         !
// DELETE /admin/reservations/:id      - delete a reservation              ?
// POST /admin/log-device              - record a manual device checkout   !

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// POST /admin — admin login :)
router.post('/admin', async (req, res) => {
     const { identifier, password } = req.body;
  if (!identifier || !password) {
    return res.status(400).json({ error: 'Username/email and password are required.' });
  }
  try {
    const [rows] = await db.execute('SELECT * FROM users WHERE username = ? OR email = ?', [identifier, identifier]);
    const user = rows[0];
    if (!user) {
      return res.status(401).json({ error: 'No account with those credentials found.' });
    }

    if (!user.isStaff) {
      return res.status(403).json({ error: 'Access denied: not an admin user.' });
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid credentials.' });
    }
    res.json({ message: 'Admin login successful', userId: user.userID, username: user.username, isStaff: true });
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /admin


// Dashboard summary stats
router.get('/admin/dashboard', async(req, res) => {
    const today = new Date().toISOString().slice(0, 10);
  try {
    const [[{ total }]] = await db.query('SELECT COUNT(*) AS total FROM reservations');
    const [[{ checkedOutToday }]] = await db.query('SELECT COUNT(*) AS checkedOutToday FROM reservations WHERE checkedOutAt LIKE ?', [`${today}%`]);
    const [[{ checkedInToday }]] = await db.query('SELECT COUNT(*) AS checkedInToday FROM reservations WHERE checkedInAt LIKE ?', [`${today}%`]);
    const [[{ overdue }]] = await db.query('SELECT COUNT(*) AS overdue FROM reservations WHERE checkedInAt IS NULL AND checkedOutAt < ?', [today]);
    res.json({ totalDevices: total, checkedOutToday, checkedInToday, overdue });
  } catch (err) {
    console.error('Dashboard query error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/users - list users
router.get('/admin/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/log-device - manual device checkout
router.post('/admin/log-device', async (req, res) => {
  const { userId, deviceId, locationId, startTime, endTime, reason, adminNotes } = req.body;
  if (!userId || !deviceId) {
    return res.status(400).json({ error: 'userId and deviceId are required' });
  }
  try {
    await db.execute(
      'INSERT INTO reservations (userID, deviceID, locationID, startTime, endTime, reason, adminNotes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, deviceId, locationId, startTime, endTime, reason || null, adminNotes || null]
    );
    res.status(201).json({ message: 'Device usage logged' });
  } catch (err) {
    console.error('Manual checkout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/reservations - create reservation for user
router.post('/admin/reservations', async (req, res) => {
  const { userId, deviceId, locationId, startTime, endTime, reason } = req.body;
  if (!userId || !deviceId || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await db.execute(
      'INSERT INTO reservations (userID, deviceID, locationID, startTime, endTime, reason) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, deviceId, locationId, startTime, endTime, reason || null]
    );
    res.status(201).json({ message: 'Reservation created' });
  } catch (err) {
    console.error('Manual reservation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/reservations - list current reservations
router.get('/admin/reservations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/admin/reservations/:id/checkin', async (req, res) => {
  const { id } = req.params;
  const { condition } = req.body;
  try {
    await db.execute(
      'UPDATE reservations SET checkedInAt = NOW(), condition = ? WHERE reservationID = ?',
      [condition || null, id]
    );
    res.json({ message: 'Reservation checked in' });
  } catch (err) {
    console.error('Manual check-in error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;