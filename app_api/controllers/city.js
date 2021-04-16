const weatherProvider = require('../../app_server/services/waetherProvider');
const appServer = require('../../app_server/controllers/city');


const getEverSearchedCityList =function(req,res){
    appServer.getEverSearchedCityList(function(err,callback){
        res.status(200).json(callback);
    })
}

const getWorldCityList = function(req,res){
    appServer.getWorldCityList(function(err,callback){
        res.status(200).json(callback);
    })
}

module.exports = {
    getEverSearchedCityList,
    getWorldCityList
}