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
app.use(require('./routes/admin'));
app.use(require('./routes/history'));
app.use(require('./routes/locations'));
app.use(require('./routes/reasons'));
app.use(require('./routes/user'));
app.use(require('./routes/verify-address'));


app.get('/', (req, res) => {
    res.send('API is running');
});

const PORT = process.env.PORT || 3307;
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});