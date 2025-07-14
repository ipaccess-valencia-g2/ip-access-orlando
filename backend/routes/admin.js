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


// Dashboard summary stats
router.get('/admin/dashboard', (req, res) => {
    const today = new Date().toISOString().slice(0, 10);

    db.serialize(() => {
        db.get('SELECT COUNT(*) AS total FROM reservations', (err, row1) => {
            if (err) return res.status(500).json({ error: err.message });

            db.get(
                `SELECT COUNT(*) AS checkedOutToday FROM reservations WHERE checkedOutAt LIKE ?`,
                [`${today}%`],
                (err, row2) => {
                    if (err) return res.status(500).json({ error: err.message });

                    db.get(
                        `SELECT COUNT(*) AS checkedInToday FROM reservations WHERE checkedInAt LIKE ?`,
                        [`${today}%`],
                        (err, row3) => {
                            if (err) return res.status(500).json({ error: err.message });

                            db.get(
                                `SELECT COUNT(*) AS overdue FROM reservations WHERE checkedInAt IS NULL AND checkedOutAt < ?`,
                                [today],
                                (err, row4) => {
                                    if (err) return res.status(500).json({ error: err.message });

                                    res.json({
                                        totalDevices: row1.total,
                                        checkedOutToday: row2.checkedOutToday,
                                        checkedInToday: row3.checkedInToday,
                                        overdue: row4.overdue,
                                    });
                                }
                            );
                        }
                    );
                }
            );
        });
    });
});

module.exports = router;

router.get('/admin', (req, res) => {
    res.send('Admin Dashboard');
});

// Reuse all user routes under the /admin prefix
const userRoutes = require('./user');
router.use('/admin', userRoutes);

module.exports = router;