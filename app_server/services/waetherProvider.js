const request = require('request');
const city = require('../models/city');
require('dotenv').config();
var data=require('../app_data/cityList.json');

const url='https://api.openweathermap.org/data/2.5/weather?appid='+process.env.API_KEY;


function getCurrentWeatherByCityId(cityId,callback){
    request({
        url: `${url}&id=${cityId}`,
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
}

function getCurrentWeatherByLatLon(lat,lon,callback){
    request({
        url: `${url}&lat=${lat}&lon=${lon}`,
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
}

function getCurrentWeatherByName(name,callback){
    request({
        url: `${url}&q=${name}`,
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
}

function getCurrentWeatherByCityList(list,callback){
    request({
        url: `${url}&q=${list}`,
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
}

function getWorldCityList(callback){
    callback(null,data);
}



module.exports={
    getCurrentWeatherByCityId,
    getCurrentWeatherByLatLon,
    getCurrentWeatherByName,
    getWorldCityList,
    getCurrentWeatherByCityList
}