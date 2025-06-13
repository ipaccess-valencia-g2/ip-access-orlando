// server set up

const express = require('express');
const cors = require('cors');
const app = express();
const db = require('./db/connection');

app.use(cors());
app.use(express.json());

app.use('/register', require('./routes/register'));
app.use(require('./routes/login'));
app.use('/reserve', require('./routes/reserve'));
app.use('/admin', require('./routes/admin'));
//app.use('/history', require('./routes/history'));
app.use('/locations', require('./routes/locations'));
app.use('/reasons', require('./routes/reasons'));
app.use(require('./routes/user'));
//app.use('/verify-address', require('./routes/verify-address'));

//note: some routes use the prefix here, others when the route is called

app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});