var fetch = require('./fetch');

/* Get home page */
const index = function(req, res){
    res.render('index', {title: 'weatherexpress group project'});
};


const stest= function(req,res){
    let result;
    fetch.getCurrentWeatherByCityId(2172797,function(err, body) {
        if (err) {
            console.log(err);
        } else {
            result=body;
            console.log(result);
        }
    });
    var ss=0;
}


module.exports = {
    index,
    stest
};