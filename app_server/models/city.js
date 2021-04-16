const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    name: String,
    country: String,
});

module.exports = mongoose.model('City', CitySchema);