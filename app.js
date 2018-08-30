const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const db = require('./config/keys').mongoURI;
mongoose.connect(db, { useNewUrlParser: true });

app.use(bodyParser.json());

const beerItems = require('./routes/api/beeritems');

app.use('/api/beeritems', beerItems);

const PORT = process.env.PORT || 5000;

app.listen(PORT);