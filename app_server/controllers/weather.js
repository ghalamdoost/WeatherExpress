const mongoose = require('mongoose');
const Wea = mongoose.model('Weather');
const city = require('./city');
const weatherProvider = require('../services/waetherProvider');

const createWeather=function(wunits,obj,wcountry,callback){
    if(obj.weather && obj.weather.length>0){
        Wea.create({
            /*coord_lon: obj.coord.lon,
            coord_lat: obj.coord.lat,*/
            weather_id: obj.weather[0].id,
            weather_main: obj.weather[0].main,
            weather_description: obj.weather[0].description,
            weather_icon: obj.weather[0].icon,
            timezone: obj.timezone,
            base: obj.base,
            main_temp: obj.main.temp,
            main_feels_like: obj.main.temp,
            main_temp_min: obj.main.temp_min,
            main_temp_max: obj.main.temp_max,
            main_pressure: obj.main.pressure,
            main_humidity: obj.main.humidity,
            visibility: obj.visibility,
            sys_sunrise: obj.sys.sunrise,
            sys_sunset: obj.sys.sunset,
            objid: obj.id,
            name: obj.name,
            cod: obj.cod,
            wind_deg: obj.wind.deg,
            wind_speed: obj.wind.speed,
            country:wcountry,
            units:wunits
        },(err, wdata) => {
            if(err){
                callback(err,null);
            }else{
                callback(null,wdata);
            }
        }); 
    }else{
        //call api to get weather data, and store it in db
        weatherProvider.getCurrentWeatherByNameAndCountry(wunits,obj.name,wcountry,function(err,result){
            var s= result;

            Wea.create({
                /*coord_lon: result.coord.lon,
                coord_lat: result.coord.lat,*/
                weather_id: result.weather[0].id,
                weather_main: result.weather[0].main,
                weather_description: result.weather[0].description,
                weather_icon: result.weather[0].icon,
                timezone: result.timezone,
                base: result.base,
                main_temp: result.main.temp,
                main_feels_like: result.main.temp,
                main_temp_min: result.main.temp_min,
                main_temp_max: result.main.temp_max,
                main_pressure: result.main.pressure,
                main_humidity: result.main.humidity,
                visibility: result.visibility,
                sys_sunrise: result.sys.sunrise,
                sys_sunset: result.sys.sunset,
                objid: result.id,
                name: obj.name,//result.name,//save the searched name, not the returned to avoid problems with search
                cod: result.cod,
                wind_deg: result.wind.deg,
                wind_speed: result.wind.speed,
                country:wcountry,
                units:wunits
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

const createOrUpdateWeather = function(wunits,obj,res){
    if(obj){
        if (!obj.name) {
            res("Not found, name is required",null);        
        }
    }

    Wea.find({name:obj.name, country:obj.country, units:wunits})
        .exec((err, weather) => {
            if (!weather || weather.length==0) {
                createWeather(wunits,obj,function(err,body){
                    if(err){
                        res(err,null);
                    }else{
                        res(null,body);
                    }
                });
            } else if (err) {
                res(JSON.stringify(err),null);                 
            }else{
                /*weather[0].coord_lon= obj.coord.lon;
                weather[0].coord_lat= obj.coord.lat;*/
                weather[0].weather_id= obj.weather[0].id;
                weather[0].weather_main= obj.weather[0].main,
                weather[0].weather_description= obj.weather[0].description,
                weather[0].weather_icon= obj.weather[0].icon,
                weather[0].timezone= obj.timezone;
                weather[0].base=obj.base;
                weather[0].main_temp=obj.main.temp;
                weather[0].main_feels_like=obj.main.temp;
                weather[0].main_temp_min=obj.main.temp_min;
                weather[0].main_temp_max=obj.main.temp_max;
                weather[0].main_pressure=obj.main.pressure;
                weather[0].main_humidity=obj.main.humidity;
                weather[0].visibility=obj.visibility;
                weather[0].sys_sunrise=obj.sys.sunrise;
                weather[0].sys_sunset=obj.sys.sunset;
                weather[0].objid= obj.id;
                weather[0].name= obj.name;
                weather[0].cod= obj.cod;
                weather[0].wind_speed=obj.wind.speed;
                weather[0].wind_deg=obj.wind.deg;
                weather[0].units=wunits;
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

const getCurrentWeatherByNameAndCountry=function(wunits,wname,wcountry,response){
    //check if there is any city stored in the database with the same id and name; if not, add it, if it was added, simply bypass.
    checkCityExistOrAdd(wunits,wname,wcountry,function(err,callback){
        //check if err == false or true , then add weather or no
        if(!err){            
            createWeather(wunits,callback,wcountry,function(err,res){
                response(null,res);
            })
        }else{
            Wea.find({name:wname,country:wcountry,units:wunits})
                .exec((err,weather)=>{
                    if(!weather){
                        response("weather not found",null);
                    }else if (err) {
                        response(JSON.stringify(err),null);
                    }else{
                        response(null, weather[0]);//Added [0], the answer was an array
                    }
                });
        }            
    });
    
}

const checkCityExistOrAdd=function(units,wname,wcountry,res){
    city.checkCityExistOrAdd(units,wname,wcountry,function(err,callback){
        res(err,callback);
    })
}

module.exports = {
    createOrUpdateWeather,
    getCurrentWeatherByNameAndCountry
}