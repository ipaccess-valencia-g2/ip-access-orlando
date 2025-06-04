/// --- POST /reserve

const express = require('express');
const db = require('../db/connection');
const router = express.Router();

router.post('/', async (req, res) => {
    const { startTime, endTime, locationId, reason, userId, deviceId } = req.body;

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

        //if (reason) {

        //    const [reasonCount] = await db.query('SELECT * FROM reasons WHERE label = ?', [reason]);
        //    if (reasonCount.length === 0 && !otherReason) {
        //        return res.status(400).json({ error: 'Invalid reason.' });
        //    }
        //}
        //else {
        if (!reason) {

            return res.status(400).json({ error: 'Reason is required.' });
        }

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required.' });
        }

        //presumably a check needs to exist whether the location has an existing device available for the time requested. there also needs to be a check agaisnt duplicate reservations.

        await db.execute(
            'INSERT INTO reservations (startTime, endTime, locationID, reason, userID, deviceID) VALUES (?, ?, ?, ?, ?, ?)',
            [startTime, endTime, locationId, reason, userId, deviceId]
        );

        res.status(201).json({ message: 'Reservation created successfully.' });
    }
    catch (error) {

        console.error('Reservation error:', error);
        return res.status(500).json({ error: 'Internal server error.' });
    }
});

module.exports = router;