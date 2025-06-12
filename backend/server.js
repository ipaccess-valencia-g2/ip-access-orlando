// server set up

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/connection');

app.use(cors());
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use('/lgoin', require('./routes/login'));
app.use('/reserve', require('./routes/reserve'));
app.use('/admin', require('./routes/admin'));
//app.use('/history', require('./routes/history'));
app.use('/locations', require('./routes/locations'));
app.use('/reasons', require('./routes/reasons'));
app.use('/user', require('./routes/user'));
//app.use('/verify-address', require('./routes/verify-address'));


app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3307;

app.get('/dbtest', async (req, res) => {
  try {
    const [rows] = await db.query('SELECT NOW() AS time');
    console.log('DB test successful:', rows);
    res.json(rows);
  } catch (err) {
    console.error('DB test failed:', err);
    res.status(500).json({ error: 'DB query failed' });
  }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is listening on port ${PORT}`);
});