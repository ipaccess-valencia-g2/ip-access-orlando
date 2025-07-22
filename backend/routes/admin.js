// Admin Routes

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// POST /admin — admin login
router.post('/login', async (req, res) => {
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

// Dashboard summary stats
router.get('/dashboard', async(req, res) => {
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
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PUT /admin/users/:id - update basic user fields
router.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { firstName, lastName, email } = req.body;
  try {
    await db.execute(
      'UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userID = ?',
      [firstName, lastName, email, id]
    );
    const [rows] = await db.query('SELECT * FROM users WHERE userID = ?', [id]);
    res.json(rows[0]);
  } catch (err) {
    console.error('Admin user update error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// PATCH /admin/users/:id/promote - promote to admin
router.patch('/users/:id/promote', async (req, res) => {
  const { id } = req.params;
  try {
    await db.execute('UPDATE users SET isStaff = 1 WHERE userID = ?', [id]);
    res.json({ message: 'User promoted to admin' });
  } catch (err) {
    console.error('Admin promote error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/devices - list all devices with location info and active status
router.get('/devices', async (req, res) => {
  try {
    const [rows] = await db.query(
      `SELECT d.deviceID, d.locationId, d.isAvailable, l.name AS locationName,
              r.reservationID
       FROM devices d
       LEFT JOIN locations l ON d.locationId = l.locationId
       LEFT JOIN reservations r
         ON r.deviceID = d.deviceID AND r.checkedInAt IS NULL`
    );
    res.json(rows);
  } catch (err) {
    console.error('Error fetching devices:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/log-device - manual device checkout
router.post('/log-device', async (req, res) => {
  const { userId, deviceId, locationId, startTime, endTime, reason, adminNotes } = req.body;
  if (!userId || !deviceId || !locationId) {
    return res.status(400).json({ error: 'userId, deviceId and locationId are required' });
  }
  try {
    await db.execute(
      'INSERT INTO reservations (userID, deviceID, locationId, startTime, endTime, reason, adminNotes) VALUES (?, ?, ?, ?, ?, ?, ?)',
      [userId, deviceId, locationId, startTime, endTime, reason || null, adminNotes || null]
    );
    res.status(201).json({ message: 'Device usage logged' });
  } catch (err) {
    console.error('Manual checkout error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// POST /admin/reservations - create reservation for user
router.post('/reservations', async (req, res) => {
  const { userId, deviceId, locationId, startTime, endTime, reason } = req.body;
  if (!userId || !deviceId || !locationId || !startTime || !endTime) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  try {
    await db.execute(
      'INSERT INTO reservations (userID, deviceID, locationId, startTime, endTime, reason) VALUES (?, ?, ?, ?, ?, ?)',
      [userId, deviceId, locationId, startTime, endTime, reason || null]
    );
    res.status(201).json({ message: 'Reservation created' });
  } catch (err) {
    console.error('Manual reservation error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// GET /admin/reservations - list current reservations
router.get('/reservations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.json(rows);
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

router.put('/reservations/:id/checkin', async (req, res) => {
  const { id } = req.params;
  const { condition } = req.body;
  try {
    await db.execute(
      'UPDATE reservations SET checkedInAt = NOW(), condition = ? WHERE reservationID = ?',
      [condition || null, id]
    );
    await db.execute(
      'UPDATE devices SET isAvailable = 1 WHERE deviceID = (SELECT deviceID FROM reservations WHERE reservationID = ?)',
      [id]
    );
    res.json({ message: 'Reservation checked in' });
  } catch (err) {
    console.error('Manual check-in error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;