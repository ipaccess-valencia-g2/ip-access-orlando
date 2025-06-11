// Admin Routes Information
// (requires logged-in user with isStaff=true)
// POST /admin                         - admin login (optional)            !
// GET  /admin/users                   - list all users                    ✓
// GET  /admin/users/:userId           - view a single user                ✓
// PUT  /admin/users/:userId/:column/:value - update a user field          ✓
// GET  /admin/reservations            - list all reservations             !
// GET  /admin/reservations/:reservationID - list all reservations         !
// DELETE /admin/reservations/:id      - delete a reservation              ?
// POST /admin/log-device              - record a manual device checkout   !
// GET /admin/devices/available        - return list of available devices  !
// GET /admin/devices/unavailable      - return list of unavailable devices!

const express = require('express');
const router = express.Router();
const db = require('../db/connection');
const bcrypt = require('bcrypt');
const verify = require('../middleware/verify');

// GET /admin
router.get('/admin', verify.Verify, verify.VerifyRole, (req, res) => {
    res.send('Admin Dashboard');
});

// GET /users
router.get('/users', async (req, res) =>
{
    try
    {
        // Get all users
        const [rows] = await db.query('SELECT * FROM users');

        res.json({rows});
    }
    catch (error)
    {
        console.error('Error fetching users:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /users/:userID
router.get('/users/:userID', async (req, res) =>
{
   try
    {
        // Get user by userID
        const [userInfo] = await db.execute(
            'SELECT * FROM users WHERE userID = ?',
            [req.params.userID]
        );

        // Output the user info
        res.json({userInfo});
    }
    catch (error)
    {
        console.error('Error fetching user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// PUT /users/:userID/:column/:value
router.put('/users/:userID/:column/:value', async (req, res) =>
{
    try
    {
        // If the column is password, hash the new password
        if (req.params.column === 'password')
        {
            // Hash the password
            const hashedPassword = await bcrypt.hash(req.params.value, 10);

            // Update user password by userID
            await db.execute(
                'UPDATE users SET password = ? WHERE userID = ?',
                [hashedPassword, req.params.userID]
            );
        }
        else
        {
            // Update user info by userID
           // Update user info by userID (ensure column is validated beforehand)
            await db.execute(
                `UPDATE users SET ${req.params.column} = ? WHERE userID = ?`,
                [req.params.value, req.params.userID]
            );
        }

        // Save new user info for display
       const [newUser] = await db.execute(
            'SELECT * FROM users WHERE userID = ?',
            [req.params.userID]
        );

        // Display new user info
        res.json({ message: 'User updated: ', newUser });
    }
    catch (error)
    {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /reservations
router.get('/reservations', async (req, res) =>
{
    try
    {
        // Get all users
        const [rows] = await db.query('SELECT * FROM reservations');

        res.json({rows});
    }
    catch (error)
    {
        console.error('Error fetching reservations:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// GET /reservations/:reservationID
router.get('/reservations/:reservationID', async (req, res) =>
{
    try
    {
        // Get reservation by reservationID
        const [reservationInfo] = await db.query(
            'SELECT * FROM reservations WHERE reservationID = ?',
            [req.params.reservationID]
        );

        // Output the reservation info
        res.json({reservationInfo});
    }
    catch (error)
    {
        console.error('Error fetching reservation:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

//DELETE /reservations/:id
router.delete('/reservations/:id', async (req, res) => {
    const { id } = req.params;

    try {

        const [result] = await db.execute('DELETE FROM reservations WHERE reservationID = ?', [id]);
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Reservation not found.' });
        }
        res.json({ message: 'Reservation deleted successfully.' });
    } catch (error) {

        console.error('Reservation delete error:', error);
        res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /admin/devices/available
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

// GET /admin/devices/unavailable
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

module.exports = router;