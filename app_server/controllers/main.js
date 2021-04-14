var weatherAPI = require('../services/waetherAPI');

/* Get home page */
const index = function(req, res){
    res.render('index', {title: 'weatherexpress group project'});
};


const stest= function(req,res){
    weatherAPI.getCurrentWeatherByCityId(2172797,function(err, body) {
        if (err) {
            console.log(err);
        } else {
            console.log(body);
        }
    });
}


module.exports = {
    index,
    stest
};