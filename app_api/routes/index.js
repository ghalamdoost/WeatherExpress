const express = require('express');
const router = express.Router();

const ctrlWeather = require('../controllers/weather');
router.route('/weathers/:units/:wname/:wcountry').get(ctrlWeather.getCurrentWeatherByNameAndCountry);

const ctrlCity = require('../controllers/city');
router.route('/cities/searched').get(ctrlCity.getEverSearchedCityList);
router.route('/cities/world').get(ctrlCity.getWorldCityList);

module.exports = router;