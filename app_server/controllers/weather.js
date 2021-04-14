const mongoose = require('mongoose');

const Wea = mongoose.model('Weather');

const createWeather=function(obj,res){
    Wea.create({
        coord_lon: obj.coord.lon,
        coord_lat: obj.coord.lat,
        weather_id: obj.weather[0].id,
        timezone: obj.timezone,
        objid: obj.id,
        name: obj.name,
        cod: obj.cod
    },(err, wdata) => {
        if(err){
            res(err,null);
        }else{
            res(null,wdata);
        }
    }); 
}

const createOrUpdateWeather = function(obj,res){
    if (!obj.name) {
        res("Not found, name is required",null);        
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

const getCurrentWeatherByLatLon=function(wlat,wlon,res){
    Wea.find({coord_lat:wlat, coord_lon:wlon})
        .exec((err,weather)=>{
            if(!weather){
                res("weather not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, weather);
            }
        })
}

const getCurrentWeatherByName=function(wname,res){
    //check if there is any city stored in the database with the same id and name; if not, add it, if it was added, simply bypass.
    Wea.find({name:wname})
        .exec((err,weather)=>{
            if(!weather){
                res("weather not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, weather);
            }
        })
}

module.exports = {
    createOrUpdateWeather,
    getCurrentWeatherByLatLon,
    getCurrentWeatherByName
}