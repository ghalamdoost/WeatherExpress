const appServer = require('../../app_server/controllers/weather');


const getCurrentWeatherByNameAndCountry=function(req,res){
    debugger;
    appServer.getCurrentWeatherByNameAndCountry(req.params.units,req.params.wname,req.params.wcountry,function(err,weather){
        if(err){
            res.status(404).json(err);
        }else{
            res.status(200).json(weather);
        }
    });
}


module.exports = {
    getCurrentWeatherByNameAndCountry
}