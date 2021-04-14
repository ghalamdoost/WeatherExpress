const appServer = require('../../app_server/controllers/weather');

const getCurrentWeatherByLatLon=function(req,res){
    appServer.getCurrentWeatherByLatLon(req.params.wlat,req.params.wlon,function(err,weather){
        if(err){
            res.status(404).json(err);
        }else{
            res.status(200).json(weather);
        }
    });
}

const getCurrentWeatherByName=function(req,res){
    appServer.getCurrentWeatherByName(req.params.wname,function(err,weather){
        if(err){
            res.status(404).json(err);
        }else{
            res.status(200).json(weather);
        }
    });
}


module.exports = {
    getCurrentWeatherByLatLon,
    getCurrentWeatherByName
}