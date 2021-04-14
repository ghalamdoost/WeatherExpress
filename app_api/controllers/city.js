const mongoose = require('mongoose');

const Cit = mongoose.model('City');

const getCity = function(req,res){
    Cit.find().exec(function(err, cdata) {
        if(err){
            res.status(404).json(err);
            return;
        }
        res.status(200).json(cdata);
    });        
};


const createCity = function(req,res){
    Cit.create({
        id: req.body.id,
        name: req.body.name,
        state: req.body.state,
        country: req.body.country,
        coord_lon: req.body.coord.lon,
        coord_lat: req.body.coord.lat
    },(err, cdata) => {
        if(err){
            res.status(404).json(err);
            console.log("data received: "+cdata);
            return;
        }else{
            res.status(200).json(cdata);
        }
    }); 
};

const getSingleCity = function(req,res){
    const cid = req.params.cid;
    Cit.findById(cid)
        .exec((err, city) => {
            if(!city){
                return res.status(404).json({
                    "message" : "City not found "+cid
                });
            }else if(err){
                return res.status(404).json(err);
            }
            console.log("findById complete");
            res.status(200).json(city);
        });
};

const updateCity = function(req,res){
    if (!req.params.cid) {
        return res
            .status(404)
            .json({
                "message": "Not found, cid is required"
            });
    }
    Cit.findById(req.params.cid)
        .exec((err, city) => {
            if (!city) {
                return res
                    .status(404)
                    .json({
                        "message": "cid not found"
                    });
            } else if (err) {
                return res
                    .status(400)
                    .json(err);
            }
            city.id = req.body.id;
            city.name = req.body.name;
            city.state = req.body.state;
            city.country = req.body.country;
            city.coord_lon = req.body.coord.lon;
            city.coord_lat = req.body.coord.lat;
            
            city.save((err, city) => {
                if (err) {
                    res
                        .status(404)
                        .json(err);
                } else {
                    res
                        .status(200)
                        .json(city);
                }
            });
        });
};

const deleteCity = function(req,res){
    const { cid } = req.params;
    if (cid) {
        Cit.findByIdAndRemove(cid)
            .exec((err, city) => {
                if (err) {
                    return res.status(404)
                            .json(err);
                }
                //If city to delete is not found show a custom message
                if(!city){
                    return res.status(404)
                              .json({
                                  "message": "City to delete not found"
                              });
                }
                res.status(204)
                    .json(null);
            }
            );
    } else {
        res
            .status(404)
            .json({
                "message": "No City found"
            });
    }
};


module.exports = {
    // getCity,
    // createCity,
    // getSingleCity,
    // updateCity,
    // deleteCity
}