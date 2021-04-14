const weatherAPI = require('../app_server/services/waetherAPI');
const weather = require('../app_server/controllers/weather')

let obj;


function syncWeather(){
    
    weatherAPI.getCurrentWeatherByName("Cairns",function(err, body) {
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