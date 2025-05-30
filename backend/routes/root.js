const express = require('express');
const router = express.Router();

// GET /
router.get('/', (req, res) => {
    res.send('API is running (from root.js)');
});

module.exports = router;
