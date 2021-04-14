const mongoose = require('mongoose');

const CitySchema = mongoose.Schema({
    id: Number,
    name: String,
    state: String,
    country: String,
    coord_lon: Number,
    coord_lat: Number
});

//Clarify with the TEAM: CitySchema.index({coords: '2dsphere'});
module.exports = mongoose.model('City', CitySchema);