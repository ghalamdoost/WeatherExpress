const weatherProvider = require('../../app_server/services/waetherProvider');
const appServer = require('../../app_server/controllers/city');


const getWorldCityList =function(req,res){
    weatherProvider.getWorldCityList(function(err,callback){
        res.status(200).json(callback);
    })
}

const getEverSearchedCityList =function(req,res){
    appServer.getEverSearchedCityList(function(err,callback){
        res.status(200).json(callback);
    })
}

module.exports = {
    getWorldCityList,
    getEverSearchedCityList
}