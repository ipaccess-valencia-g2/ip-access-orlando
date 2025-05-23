// server set up

const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(require('./routes/register'));
app.use(require('./routes/login'));
app.use(require('./routes/reserve'));
app.use(require('./routes/admin'));
app.use(require('./routes/history'));
app.use(require('./routes/locations'));
app.use(require('./routes/reasons'));

app.listen(3306, () => console.log('Server running on port 3306'));
