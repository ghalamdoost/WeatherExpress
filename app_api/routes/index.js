const express = require('express');
const router = express.Router();

const ctrlWeather = require('../controllers/weather');
router.route('/weathers/:wname/:wcountry').get(ctrlWeather.getCurrentWeatherByNameAndCountry);

const ctrlCity = require('../controllers/city');
router.route('/cities/searched').get(ctrlCity.getEverSearchedCityList);

module.exports = router;