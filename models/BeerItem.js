const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const BeerItemSchema = new Schema({
    id: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    tagline: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    abv: {
        type: Number
    },
    ibu: {
        type: Number
    },
});

module.exports = BeerItem = mongoose.model('beeritem', BeerItemSchema);