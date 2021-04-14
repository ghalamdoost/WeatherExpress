const mongoose = require('mongoose');

const Wea = mongoose.model('Weather');

const getWeather = function(req,res){
    Wea.find().exec(function(err, wdata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(wdata);
    });        
};


const createWeather = function(req,res){
    Wea.create({
        brand: req.body.brand,
        lon: req.body.coord.lon,
        lat: req.body.coord.lat,
        weather_id: req.body.weather.id,
        weather_main: req.body.weather.main,
        weather_description: req.body.weather.description,
        weather_icon: req.body.weather.icon,
        base: req.body.base,
        main_temp: req.body.main.temp,
        main_feels_like: req.body.main.feels_like,
        main_temp_min: req.body.main.temp_min,
        main_temp_max: req.body.main.temp_max,
        main_pressure: req.body.main.pressure,
        main_humidity: req.body.main.humidity,
        visibility: req.body.visibility,
        wind_speed: req.body.wind.speed,
        wind_deg: req.body.wind.deg,
        wind_gust: req.body.wind.gust,
        clouds_all: req.body.clouds.all,
        dt: req.body.dt,
        sys_type: req.body.sys.type,
        sys_id: req.body.sys.id,
        sys_country: req.body.sys.country,
        sys_sunrise: req.body.sys.sunrise,
        sys_sunset: req.body.sys.sunset,
        timezone: req.body.timezone,
        id: req.body.id,
        name: req.body.name,
        cod: req.body.cod
    },(err, wdata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+wdata);
            return;
        }else{
            res.status(200).json(wdata);
        }
    }); 
};

const getSingleWeather = function(req,res){
    const wid = req.params.wid;
    Wea.findById(wid)
        .exec((err, weather) => {
            if(!weather){
                return res.status(404).json({
                    "message" : "weather not found"+wid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(weather);
        });
};

const updateWeather = function(req,res){
    if (!req.params.wid) {
        return res
            .status(404)
            .json({
                "message": "Not found, wid is required"
            });
    }
    Wea.findById(req.params.wid)
        .exec((err, weather) => {
            if (!weather) {
                return res
                    .status(404)
                    .json({
                        "message": "wid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            weather.brand = req.body.brand;
            weather.lon= req.body.coord.lon;
            weather.lat= req.body.coord.lat;
            weather.id= req.body.weather.id;
            weather.weather_main= req.body.weather.main;
            weather.weather_description= req.body.weather.description;
            weather.weather_icon= req.body.weather.icon;
            weather.base= req.body.base;
            weather.main_temp= req.body.main.temp;
            weather.main_feels_like= req.body.main.feels_like;
            weather.main_temp_min= req.body.main.temp_min;
            weather.main_temp_max= req.body.main.temp_max;
            weather.main_pressure= req.body.main.pressure;
            weather.main_humidity= req.body.main.humidity;
            weather.visibility= req.body.visibility;
            weather.wind_speed= req.body.wind.speed;
            weather.wind_deg= req.body.wind.deg;
            weather.wind_gust= req.body.wind.gust;
            weather.clouds_all= req.body.clouds.all;
            weather.dt= req.body.dt;
            weather.sys_type= req.body.sys.type;
            weather.sys_id= req.body.sys.id;
            weather.sys_country= req.body.sys.country;
            weather.sys_sunrise= req.body.sys.sunrise;
            weather.sys_sunset= req.body.sys.sunset;
            weather.timezone= req.body.timezone;
            weather.id= req.body.id;
            weather.name= req.body.name;
            weather.cod= req.body.cod
            
            weather.save((err, weather) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(weather);
                }
            });
        }
        );
};

const deleteWeather = function(req,res){
    const { wid } = req.params;
    if (wid) {
        Wea.findByIdAndRemove(wid)
            .exec((err, weather) => {
                if (err) {
                    return res
                        .status(404)
                        .json(err);
                }
                //If weather to delete is not found show a custom message
                if(!weather){
                    return res.status(404)
                              .json({
                                  "message": "Weather to delete not found"
                              });
                }
                res
                    .status(204)
                    .json(null);
            }
            );
    } else {
        res
            .status(404)
            .json({
                "message": "No Weather found"
            });
    }
};


module.exports = {
    getWeather,
    createWeather,
    getSingleWeather,
    updateWeather,
    deleteWeather
}