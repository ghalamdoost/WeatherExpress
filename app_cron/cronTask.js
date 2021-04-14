const waetherProvider = require('../app_server/services/waetherProvider');
const weather = require('../app_server/controllers/weather')

let obj;


function syncWeather(){
    
    waetherProvider.getCurrentWeatherByName("Cairns",function(err, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(body);
            obj=body;
            weather.createOrUpdateWeather(obj, function(err,body){
                if (err) {
                    console.log(err);
                }
            });
        }
    });
}

module.exports={
    syncWeather
}