const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

const db = process.env.mongoURI;
mongoose.connect(db, { useNewUrlParser: true });

app.use(bodyParser.json());

const beerItems = require('./routes/api/beeritems');

app.use('/api/beeritems', beerItems);

if (process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    })
}

const PORT = process.env.PORT || 5000;

app.listen(PORT);