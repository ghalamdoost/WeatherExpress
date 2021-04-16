const waetherProvider = require('../app_server/services/waetherProvider');
const weather = require('../app_server/controllers/weather');
const city = require('../app_server/controllers/city');

let obj;


function syncWeather(){
    city.getEverSearchedCityList(function(err,list){
        if(list!=null){
            list.forEach(function(city) {
                waetherProvider.getCurrentWeatherByNameAndCountry(city._doc.name,city._doc.country,function(err, body) {
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
            });
        }
    });
    
}



module.exports={
    syncWeather
}