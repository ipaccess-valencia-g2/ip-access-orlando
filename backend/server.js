const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/connection');
const cookieParser = require('cookie-parser');
const useragent = require('express-useragent');

app.use(cookieParser());
app.use(useragent.express());

const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3307',
  'http://18.223.161.174'
];

const corsOptions = {
  origin: function (origin, callback) {
    console.log('Incoming Origin:', origin);
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      console.log('Blocked Origin:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());

app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} -- Body:`, req.body);
  console.log('Headers:', req.headers);
  next();
});

app.use('/register', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/reserve', require('./routes/reserve'));
app.use('/admin', require('./routes/admin'));
//app.use('/history', require('./routes/history'));
app.use('/locations', require('./routes/locations')); //app.use('/api/locations', require('./routes/locations'));
app.use('/reasons', require('./routes/reasons'));
app.use('/users', require('./routes/user'));
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