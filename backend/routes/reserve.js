/// POST   /reserve                - create a reservation              ✓
/// PUT    /reserve/:reservationId - update an existing reservation    !
//  GET    /reserve?userID=        - fetch all reservations for a user ?
/// DELETE /reserve/:reservationId - cancel a reservation              !
/// POST   /reserve/search		   - Fetches a list of device IDs that fit a criteria

const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.post('/', async (req, res) => {
    const { startTime, endTime, locationId, reason, otherReason } = req.body; // omitted deviceId and userId to sync with the API contracts. Addition is needed later.

    try {

        if (!startTime || !endTime || Date.parse(startTime) >= Date.parse(endTime)) {

            return res.status(400).json({ error: 'Invalid start or end time.' });
        }

        if (locationId) {

            const [locCount] = await db.query('SELECT * FROM locations WHERE locationID = ?', [locationId]);

            if (locCount.length === 0) {
                return res.status(400).json({ error: 'Invalid location ID.' });
            }
        }
        else {

            return res.status(400).json({ error: 'Invalid location ID.' });
        }

        const [reasons] = await db.query('SELECT 1 FROM reasons WHERE label = ?', [reason]) // im not sure the reasonID column is even relevant since were using text instead of the ID.

        if ((reasons.length === 0 && !otherReason) || reason.localeCompare('Other') === 0 && !otherReason) {

            return res.status(400).json({ error: 'Invalid reason.' });
        }

        //presumably a check needs to exist whether the location has an existing device available for the time requested. there also needs to be a check agaisnt duplicate reservations.

        const [result] = await db.execute(
            'INSERT INTO reservations (startTime, endTime, locationID, reason, userID, deviceID) VALUES (?, ?, ?, ?, ?, ?)',
            [startTime, endTime, locationId, otherReason || reason, 1, 1]
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
    const { startTime, endTime, reason, otherReason } = req.body; // are we planning to let the user change device or rather is the device id going to be decided backend then echoed back to the user?

    try {

        if (!startTime || !endTime || Date.parse(startTime) >= Date.parse(endTime)) {

            return res.status(400).json({ error: 'Invalid start or end time.' });
        }

        if (!reason) {

            return res.status(400).json({ error: 'Reason is required.' });
        }

        const [reasons] = await db.query('SELECT 1 FROM reasons WHERE label = ?', [reason]) // im not sure the reasonID column is even relevant since were using text instead of the ID.

        if ((reasons.length === 0 && !otherReason) || reason.localeCompare('Other') === 0 && !otherReason) {

            return res.status(400).json({ error: 'Invalid reason.' });
        }

        await db.execute('UPDATE reservations SET startTime = ?, endTime = ?, reason = ? WHERE reservationID = ?', [startTime, endTime, otherReason || reason, reservationId]);

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

module.exports = router;

// GET /reserve?userID=
// fetch all reservations for a user
router.get('/', async (req, res) => {
    const userID = req.query.userID;

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
            [type, locationID, startTime, endTime]
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