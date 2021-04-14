const express = require('express');
const router = express.Router();

const ctrlWeather = require('../controllers/weather');
router.route('/weather').get(ctrlWeather.getWeather).post(ctrlWeather.createWeather);
router.route('/weather/:wid').get(ctrlWeather.getSingleWeather).put(ctrlWeather.updateWeather).delete(ctrlWeather.deleteWeather);

const ctrlCity = require('../controllers/city');
router.route('/city').get(ctrlCity.getCity).post(ctrlCity.createCity);
router.route('/city/:cid').get(ctrlCity.getSingleCity).put(ctrlCity.updateCity).delete(ctrlCity.deleteCity);

module.exports = router;