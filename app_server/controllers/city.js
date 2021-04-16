const e = require('express');
const mongoose = require('mongoose');
const Cit = mongoose.model('City');
const weatherProvider=require('../services/waetherProvider');

const getEverSearchedCityList=function(res){
    Cit.find()
        .exec((err,list)=>{
            if(!list){
                res("list not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, list);
            }
        })
}

const getCityBynameAndCountry=function(wunits,wname,wcountry,res){
    Cit.find({name:wname,country:wcountry,units:wunits})
        .exec(function(err,city){
            if(!city || city.length==0){
                res("city not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, city);
            }
        })
}

const checkCityExistOrAdd=function(units,wname,wcountry,res){
    if(units!=null && wname!=null && wcountry!=null){
        getCityBynameAndCountry(units,wname,wcountry,function(err,city){
            if(!city || err){
                createCity(units,wname,wcountry,function(err,docs){
                    if(!err){
                        res(false, docs);
                    }else{
                        res(err,null)
                    }
                });
            }else{
                res(true, city);
            }
        })
    }
}

const createCity=function(wunits,wname,wcountry,callback){
    weatherProvider.getWorldCityList(function(err,list){
        var result;
        if(wname!=null && wcountry!=null){            
            result=list.filter(city => city.name.match(wname) && city.country.match(wcountry));
            if(result.length>1){
                result=result.filter(x=>x.name===wname && x.country===wcountry);            
            }
        }
        var city=result.reduce((acc, current) => {
            const x = acc.find(item => item.name === current.name && item.country === current.country);
            if (!x) {
              return acc.concat([current]);
            } else {
              return acc;
            }
        }, []);

        if(city && city.length>0){
            Cit.create({
                country: city[0].country,
                name: city[0].name,
                units:wunits
            },(err, cdata) => {
                if(err){
                    callback(err,null);
                }else{
                    callback(null,cdata._doc);
                }
            });
        }else{
            callback("no data",null);
        }        
    })
}


module.exports = {
    getEverSearchedCityList,
    checkCityExistOrAdd
}