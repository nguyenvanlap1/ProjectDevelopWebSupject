const MongoDB = require('../utils/mongodb.util');
const NhaXuatBanService = require('../services/nhaxuatban.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client); 
        const result = await nhaxuatbanService.create(req.body); 
        if (result.error) { 
            return next(
                new ApiError(400, result.error)
            )
        } else { 
            res.status(201).send(result); 
        } 
    } 
    catch (error) { 
        return next(
            new ApiError(500, 'An error occurred while creating nxb')
        );
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