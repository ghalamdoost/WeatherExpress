const express = require('express');
const router = express.Router();

const ctrlWeather = require('../controllers/weather');
router.route('/weathers/latlon/:wlat/:wlon').get(ctrlWeather.getCurrentWeatherByLatLon);
router.route('/weathers/name/:wname').get(ctrlWeather.getCurrentWeatherByName);

const ctrlCity = require('../controllers/city');
router.route('/cities/world').get(ctrlCity.getWorldCityList);
router.route('/cities/searched').get(ctrlCity.getEverSearchedCityList);
// router.route('/city/:cid').get(ctrlCity.getSingleCity).put(ctrlCity.updateCity).delete(ctrlCity.deleteCity);

module.exports = router;