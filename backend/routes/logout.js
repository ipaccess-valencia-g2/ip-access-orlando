const express = require('express');
const router = express.Router();

router.post('/logout', (req, res) => {
    res.clearCookie('SessionID', { httpOnly: true, sameSite: 'Lax' });
    res.json({ status: 'success', message: 'Logged out' });
});

module.exports = router;