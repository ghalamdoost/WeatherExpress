const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
    
});


WeatherSchema.index({coords: '2dsphere'});
module.exports = mongoose.model('Weather', WeatherSchema);