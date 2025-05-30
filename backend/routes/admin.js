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

module.exports = router;
