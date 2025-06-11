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
        // Look up user by username or email
        const [rows] = await db.execute(
            'SELECT * FROM users WHERE username = ? OR email = ?',
            [identifier, identifier]
        );

        const user = rows[0];

        if (!user) {
            return res.status(401).json({ error: 'No account with those credentials found.' });
        }

        if (!user.isStaff) {
            return res.status(403).json({ error: 'Access denied: not an admin user.' });
        }

        // Compare hashed passwords
        const passwordMatch = await bcrypt.compare(password, user.password);
        if (!passwordMatch) {
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Respond with success
        res.json({
            message: 'Admin login successful',
            userId: user.userID,
            username: user.username,
            isStaff: true
        });

    } catch (error) {
        console.error('Admin login error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /admin
router.get('/admin', (req, res) => {
  res.send('Admin Dashboard');
});

// Reuse all user routes under the /admin prefix
const userRoutes = require('./users');
router.use('/admin', userRoutes);

module.exports = router;