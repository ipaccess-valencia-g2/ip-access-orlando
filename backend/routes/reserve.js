/// POST   /reserve                - create a reservation              ✓
/// PUT    /reserve/:reservationId - update an existing reservation    !
//  GET    /reserve?userID=        - fetch all reservations for a user ?
/// DELETE /reserve/:reservationId - cancel a reservation              !
/// POST   /reserve/search		   - Fetches a list of device IDs that fit a criteria

const express = require('express');
const db = require('../db/connection');
const router = express.Router();
const { Verify } = require('../middleware/verify');

router.post('/', Verify, async (req, res) => {
    const { deviceID, locationID, userID, startTime, endTime, reason } = req.body; // omitted deviceId and userId to sync with the API contracts. Addition is needed later.

    try {

        if (!startTime || !endTime || Date.parse(startTime) >= Date.parse(endTime)) {

            return res.status(400).json({ error: 'Invalid start or end time.' });
        }

        if (locationID) {

            const [locCount] = await db.query('SELECT * FROM locations WHERE locationID = ?', [locationID]);

            if (locCount.length === 0) {
                return res.status(400).json({ error: 'Invalid location ID.' });
            }
        }
        else {

            return res.status(400).json({ error: 'Invalid location ID.' });
        }

        const [result] = await db.execute(
            'INSERT INTO reservations (startTime, endTime, locationID, reason, userID, deviceID) VALUES (?, ?, ?, ?, ?, ?)',
            [startTime, endTime, locationID, reason, userID, deviceID]
        );

        res.status(201).json({ message: 'Reservation created', reservationId: result.insertId });
    }
    catch (error) {

        console.error('Reservation error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.put('/:reservationId', async (req, res) => {

    const { reservationId } = req.params;
    const { startTime, endTime, reason } = req.body; // are we planning to let the user change device or rather is the device id going to be decided backend then echoed back to the user?

    try {

        if (!startTime || !endTime || Date.parse(startTime) >= Date.parse(endTime)) {

            return res.status(400).json({ error: 'Invalid start or end time.' });
        }

        if (!reason) {

            return res.status(400).json({ error: 'Reason is required.' });
        }

        await db.execute('UPDATE reservations SET startTime = ?, endTime = ?, reason = ? WHERE reservationID = ?', [startTime, endTime, reason, reservationId]);

        res.status(200).json({ message: 'Reservation updated' });
    }
    catch (error) {

        console.error('Reservation update error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

router.delete('/:reservationId', async (req, res) => {

    const { reservationId } = req.params;

    try {

        const [result] = await db.execute('DELETE FROM reservations WHERE reservationID = ?', [reservationId]);

        if (result.affectedRows === 0) {

            return res.status(404).json({ error: 'Reservation not found.' });
        }

        res.status(200).json({ message: 'Reservation deleted successfully.' });
    }
    catch (error) {

        console.error('Reservation delete error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

// GET /reserve?userID=
// fetch all reservations for a user
router.get('/user', Verify, async (req, res) => {
    const userID = req.query.userID;

    res.status(200).json({ message: `Welcome! You are logged in as user ${req.user.id}` });

    if (!userID) {
        return res.status(400).json({ error: 'Missing userID parameter.' });
    }

    try {
        const [rows] = await db.execute(
            'SELECT * FROM reservations WHERE userID = ?',
            [userID]
        );
        res.status(200).json(rows);
    } catch (err) {
        console.error('Error fetching reservations:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/search', async (req, res) => {
    const { type, locationID, startTime, endTime } = req.body;

    if (!type || !locationID || !startTime || !endTime) {
        return res.status(400).json({ error: 'Missing one or more required query parameters: type, location, startdate, enddate.' });
    }

    try {
		console.log('Running search with:', { type, locationID, startTime, endTime });
        const [rows] = await db.execute(
            `
      SELECT d.deviceID
      FROM devices d
      WHERE d.isAvailable = 1
        AND d.type = ?
        AND d.locationID = ?
        AND d.deviceID NOT IN (
          SELECT r.deviceID
          FROM reservations r
          WHERE r.startTime < ?
            AND r.endTime > ?
        )
      `,
            [type, locationID, endTime, startTime]
        );
		
		console.log(`Found ${rows.length} devices.`);

        const deviceIDs = rows.map(row => row.deviceID);
		console.log('Sending response:', deviceIDs);
        res.status(200).json(deviceIDs);
    } catch (err) {
        console.error('Error fetching available devices:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});


module.exports = router;