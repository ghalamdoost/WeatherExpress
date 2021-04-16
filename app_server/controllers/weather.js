const mongoose = require('mongoose');
const Wea = mongoose.model('Weather');
const city = require('./city');
const weatherProvider = require('../services/waetherProvider');

const createWeather=function(obj,wcountry,callback){
    if(obj.weather && obj.weather.length>0){
        Wea.create({
            coord_lon: obj.coord.lon,
            coord_lat: obj.coord.lat,
            weather_id: obj.weather[0].id,
            timezone: obj.timezone,
            objid: obj.id,
            name: obj.name,
            cod: obj.cod,
            country:wcountry
        },(err, wdata) => {
            if(err){
                callback(err,null);
            }else{
                callback(null,wdata);
            }
        }); 
    }else{
        //call api to get weather data, and store it in db
        weatherProvider.getCurrentWeatherByNameAndCountry(obj.name,wcountry,function(err,result){
            var s= result;

            Wea.create({
                coord_lon: result.coord.lon,
                coord_lat: result.coord.lat,
                weather_id: result.weather[0].id,
                timezone: result.timezone,
                objid: result.id,
                name: result.name,
                cod: result.cod,
                country:wcountry
            },(err, wdata) => {
                if(err){
                    callback(err,null);
                }else{
                    callback(null,wdata._doc);
                }
            }); 
        })

    }
}

const createOrUpdateWeather = function(obj,res){
    if(obj){
        if (!obj.name) {
            res("Not found, name is required",null);        
        }
    }

    Wea.find({name:obj.name})
        .exec((err, weather) => {
            if (!weather || weather.length==0) {
                createWeather(obj,function(err,body){
                    if(err){
                        res(err,null);
                    }else{
                        res(null,body);
                    }
                });
            } else if (err) {
                res(JSON.stringify(err),null);                 
            }else{
                weather[0].coord_lon= obj.coord.lon;
                weather[0].coord_lat= obj.coord.lat;
                weather[0].weather_id= obj.weather[0].id;
                weather[0].timezone= obj.timezone;
                weather[0].objid= obj.id;
                weather[0].name= obj.name;
                weather[0].cod= obj.cod;
                weather[0].save((err, weather) => {
                    if (err) {
                        res(JSON.stringify(err),null);
                    } else {
                        res(null,JSON.stringify(weather));
                    }
                });
            }
        });
}

const getCurrentWeatherByNameAndCountry=function(wname,wcountry,response){
    //check if there is any city stored in the database with the same id and name; if not, add it, if it was added, simply bypass.
    checkCityExistOrAdd(wname,wcountry,null,null,function(err,callback){
        //check if err == false or true , then add weather or no
        if(!err){            
            createWeather(callback,wcountry,function(err,res){
                response(null,res);
            })
        }else{
            Wea.find({name:wname,country:wcountry})
                .exec((err,weather)=>{
                    if(!weather){
                        response("weather not found",null);
                    }else if (err) {
                        response(JSON.stringify(err),null);
                    }else{
                        response(null, weather);
                    }
                });
        }            
    });
    
}

const checkCityExistOrAdd=function(wname,wcountry,wlat,wlon,res){
    city.checkCityExistOrAdd(wname,wcountry,wlat,wlon,function(err,callback){
        res(err,callback);
    })
}

module.exports = {
    createOrUpdateWeather,
    getCurrentWeatherByNameAndCountry
}