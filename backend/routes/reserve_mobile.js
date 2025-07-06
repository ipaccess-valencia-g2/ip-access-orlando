const express = require('express');
const router = express.Router();

// test locations
const locations = [
 { locationID: 1, name: 'Downtown Tech Center', zip: '32801' },
  { locationID: 2, name: 'East Orlando Hub', zip: '32822' },
  { locationID: 3, name: 'South Trail Branch', zip: '32809' },
  { locationID: 4, name: 'Hiawassee Branch', zip: '32818' },
  { locationID: 5, name: 'Southeast Branch', zip: '32812' },
  { locationID: 6, name: 'West Oaks Branch and Genealogy Center', zip: '34761' },
  { locationID: 7, name: 'Winter Garden Branch', zip: '34787' },
  { locationID: 8, name: 'Southwest Branch', zip: '32819' },
  { locationID: 9, name: 'North Orange Branch', zip: '32703' },
  { locationID: 10, name: 'Windermere Branch', zip: '34786' },
  { locationID: 11, name: 'Eatonville Branch', zip: '32751' },
  { locationID: 12, name: 'Fairview Shores Branch', zip: '32804' },
  { locationID: 13, name: 'Washington Park Branch', zip: '32811' },
  { locationID: 14, name: 'West Oaks Branch', zip: '34761' }, 
];

// test reservation storage
const reservations = [];

// GET /reserve_mobile -> return locations
router.get('/', (req, res) => {
  res.json(locations);
});

// POST /reserve_mobile -> create a reservation
router.post('/', (req, res) => {
  const { userId, deviceType, locationId, date, time } = req.body;

  // Basic validation
  if (!userId || !deviceType || !locationId || !date || !time) {
    return res.status(400).json({ message: 'Missing required fields.' });
  }

  // Create reservation object
  const newReservation = {
    id: reservations.length + 1,
    userId,
    deviceType,
    locationId,
    date,
    time
  };

  reservations.push(newReservation);

  console.log('New reservation:', newReservation);

  res.status(201).json({
    message: 'Reservation created successfully!',
    reservation: newReservation
  });
});

module.exports = router;