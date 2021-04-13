const request = require('request');

const apiKey = '02caa31faf5a3d582a3f1145715b7d5f';
const url='https://api.openweathermap.org/data/2.5/weather?appid=02caa31faf5a3d582a3f1145715b7d5f';


function getCurrentWeatherByCityId(cityId,callback){
    request({
        url: 'https://api.openweathermap.org/data/2.5/weather?id='+cityId+'&appid=02caa31faf5a3d582a3f1145715b7d5f',
        json: true
    }, function(error, response, body){

        if (error || response.statusCode !== 200) {
            callback(error || {statusCode: response.statusCode});
        }
        callback(null, body);
    });
} 

module.exports={
    getCurrentWeatherByCityId
}