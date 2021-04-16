const mongoose = require('mongoose');

const WeatherSchema = mongoose.Schema({
    coord_lon: Number,
    coord_lat: Number,
    weather_id: Number,
    weather_main: String,
    weather_description: String,
    weather_icon: String,
    // base: String,
    // main_temp: Number,
    // main_feels_like: Number,
    // main_temp_min: Number,
    // main_temp_max: Number,
    // main_pressure: Number,
    // main_humidity: Number,
    // visibility: Number,
    // wind_speed: Number,
    // wind_deg: Number,
    // wind_gust: Number,
    // clouds_all: Number,
    // dt: Number,
    // sys_type: Number,
    // sys_id: Number,
    // sys_country: String,
    // sys_sunrise: Number,
    // sys_sunset: Number,
    timezone: Number,
    name: String,
    objid: Number,
    cod: Number,
    country:String
});

module.exports = mongoose.model('Weather', WeatherSchema);