// POST /verify-address                - check if an address is inside Orlando

const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/', async (req, res) => {
  const { address } = req.body;

  if (!address) {
    return res.status(400).json({ error: 'Address is required' });
  }

  try {
    // Replace with the City of Orlando ArcGIS API endpoint
    const lookupUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
    const response = await axios.get(lookupUrl, {
      params: {
        f: 'json',
        SingleLine: address,
        outFields: 'City,Municipality'
      }
    });

    const isInsideOrlando = Array.isArray(response.data?.candidates) &&
      response.data.candidates.some(c =>
        c.attributes?.City === 'Orlando' || c.attributes?.Municipality === 'Orlando'
      );

    res.json({ inOrlando: isInsideOrlando });
  } catch (err) {
    res.status(500).json({ error: 'Address verification failed' });
  }
});

module.exports = router;
