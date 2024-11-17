const MongoDB = require('../utils/mongodb.util');
const nhaxuatbanService = require('../services/nhaxuatban.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try { const result = await nhaxuatbanService.create(req.body); 
        if (result.error) { res.status(400).send({ error: result.error }); 
    } else { res.status(201).send(result); } } 
    catch (error) { 
        next(error); 
    }
}

exports.findAll = async (req, res, next) => {
    res.send({message: "find all nhaxuatban"})
};

exports.findOne = async (req, res, next) => {
    res.send({message: "find one nhaxuatban"})
};

exports.update = async (req, res, next) => {
    res.send({message: "update nhaxuatban"})
};

exports.delete = async (req, res, next) => {
    res.send({message: "delete nhaxuatban"})
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all nhaxuatban"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite nhaxuatban"})
};
// file controller