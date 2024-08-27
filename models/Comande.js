const mongoose = require('mongoose');

const ComandeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
     description: {
        type: String,
        required: true
    },
    SN: {
        type: String,
        required: true,
        unique: true
    },
    model: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    }
});

const Comande = mongoose.model('Comande', ComandeSchema);

module.exports = Comande;