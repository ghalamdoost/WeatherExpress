const request = require('request');
const city = require('../models/city');
require('dotenv').config();
const cities = require('all-the-cities');

const url='https://api.openweathermap.org/data/2.5/weather?appid='+process.env.API_KEY;

function getCurrentWeatherByNameAndCountry(units,wname,wcountry,callback){
    request({
        url: `${url}&q=${wname},${wcountry}&units=${units}`,
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
}

function getWorldCityList(callback){
    callback(null,cities);
}


module.exports={
    getCurrentWeatherByNameAndCountry,
    getWorldCityList,
}