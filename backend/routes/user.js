// User Routes
// GET  /users                         - list all users
// GET  /users/:userID                 - view a single user
// PUT  /users/:userID/:column/:value  - update a user field
// GET  /reservations/:userID          - list all reservations   !
// GET  /reservations/:reservationID   - view one reservation
// DELETE /reservations/:id            - delete a reservation

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');

// GET /users
router.get('/users', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM users');
    res.json({ rows });
  } catch (err) {
    console.error('Error fetching users:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /users/:userID
router.get('/:userID', async (req, res) => {
  try {
    const [userInfo] = await db.execute(
      'SELECT * FROM users WHERE userID = ?',
      [req.params.userID]
    );
    res.json({ userInfo });
  } catch (err) {
    console.error('Error fetching user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// PUT /users/:userID/:column/:value
router.put('/users/:userID/:column/:value', async (req, res) => {
  try {
    if (req.params.column === 'password') {
      const hashedPassword = await bcrypt.hash(req.params.value, 10);
      await db.execute(
        'UPDATE users SET password = ? WHERE userID = ?',
        [hashedPassword, req.params.userID]
      );
    } else {
      await db.execute(
        `UPDATE users SET ${req.params.column} = ? WHERE userID = ?`,
        [req.params.value, req.params.userID]
      );
    }

    const [newUser] = await db.execute(
      'SELECT * FROM users WHERE userID = ?',
      [req.params.userID]
    );
    res.json({ message: 'User updated:', newUser });
  } catch (err) {
    console.error('Error updating user:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /reservations
router.get('/reservations', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT * FROM reservations');
    res.json({ rows });
  } catch (err) {
    console.error('Error fetching reservations:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// GET /reservations/:reservationID
router.get('/reservations/:reservationID', async (req, res) => {
  try {
    const [reservationInfo] = await db.query(
      'SELECT * FROM reservations WHERE reservationID = ?',
      [req.params.reservationID]
    );
    res.json({ reservationInfo });
  } catch (err) {
    console.error('Error fetching reservation:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// DELETE /reservations/:id
router.delete('/reservations/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await db.execute(
      'DELETE FROM reservations WHERE reservationID = ?',
      [id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Reservation not found.' });
    }
    res.json({ message: 'Reservation deleted successfully.' });
  } catch (err) {
    console.error('Reservation delete error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /devices/available
router.get('/devices/available', async (req, res) =>
{
    try
    {
        // Get available devices
        const [rows] = await db.query('SELECT * FROM devices WHERE isAvailable = 1');

        res.json({rows});
    }
    catch (error)
    {
        console.error('Error fetching devices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /devices/unavailable
router.get('/devices/unavailable', async (req, res) =>
{
    try
    {
        // Get unavailable devices
        const [rows] = await db.query('SELECT * FROM devices WHERE isAvailable = 0');

        res.json({rows});
    }
    catch (error)
    {
        console.error('Error fetching devices:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// POST /users/:userID/verify-password
router.post('/users/:userID/verify-password', async (req, res) => {
  const { currentPassword } = req.body;

  if (!currentPassword) {
    return res.status(400).json({ error: 'Current password is required.' });
  }

  try {
    const [rows] = await db.execute(
      'SELECT password FROM users WHERE userID = ?',
      [req.params.userID]
    );

    if (!rows || rows.length === 0) {
      return res.status(404).json({ error: 'User not found.' });
    }

    const storedHash = rows[0].password;
    const match = await bcrypt.compare(currentPassword, storedHash);

    res.json({ match });
  } catch (err) {
    console.error('Password verification error:', err);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// GET /reservations/user/:userID
router.get('/reservations/user/:userID', async (req, res) => {
  try {
    const [rows] = await db.query(
      'SELECT * FROM reservations WHERE userID = ?',
      [req.params.userID]
    );
    res.json({ reservations: rows });
  } catch (err) {
    console.error('Error fetching user reservations:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
});

module.exports = router;