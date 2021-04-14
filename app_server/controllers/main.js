var waetherProvider = require('../services/waetherProvider');

/* Get home page */
const index = function(req, res){
    res.render('index', {title: 'weatherexpress group project'});
};


const stest= function(req,res){
    waetherProvider.getCurrentWeatherByCityId(2172797,function(err, body) {
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