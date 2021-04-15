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

const getCityById=function(id,res){
    Cit.find({objid:id})
        .exec((err,city)=>{
            if(!city){
                res("city not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, city);
            }
        })
}

const getCityByname=function(name,res){
    Cit.find({name:name})
        .exec((err,cities)=>{
            if(!cities.length>0){
                res("city not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, cities);
            }
        })
}

const getCityByLatLon=function(lat,lon,res){
    Cit.find({coord_lat:lat,coord_lon:res})
        .exec((err,city)=>{
            if(!city){
                res("city not found",null);
            }else if (err) {
                res(JSON.stringify(err),null);
            }else{
                res(null, city);
            }
        })
}

const checkCityExist=function(wname,wlat,wlon,res){
    if(wname==null){
        getCityByLatLon(wlat,wlon,function(err,city){
            if(!city || err){
                createCity(null,wlat,wlon,function(err, docs){
                    res(err, docs);
                });
            }else{
                res(true,city);
            }
        })
    }else if(wlat==null && wlon==null){
        getCityByname(wname,function(err,city){
            if(!city || err){
                createCity(wname,null,null,function(err,docs){
                    if(!err){
                        res(null, docs._doc);
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
//implement create city
const createCity=function(wname,wlat,wlon,callback){
    weatherProvider.getWorldCityList(function(err,list){
        var result;
        if(wname==null){
            result=list.filter(x=>x.coord_lon===wlon&&x.coord_lat===wlat);
        }else if(wlat==null && wlon==null){
            result=list.filter(x=>x.name===wname);
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
                coord_lon: city[0].coord.lon,
                coord_lat: city[0].coord.lat,
                country: city[0].country,
                state: city[0].state,
                objid: city[0].id,
                name: city[0].name,
            },(err, cdata) => {
                if(err){
                    callback(err,null);
                }else{
                    callback(null,cdata);
                }
            });
        }else{
            callback("no data",null);
        }


          
        
        
    })
}


module.exports = {
    getEverSearchedCityList,
    getCityById,
    getCityByname,
    getCityByLatLon,
    checkCityExist
}