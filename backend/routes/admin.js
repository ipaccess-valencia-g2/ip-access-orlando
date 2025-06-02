/// --- GET /admin/users/:userId
const express = require('express');
const router = express.Router();

// GET /admin
router.get('/', (req, res) => {
    res.send('Admin Dashboard');
});

// Add more admin routes if needed
router.get('/users', (req, res) => {
    res.send('Admin Users List');
});

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

module.exports = router;
