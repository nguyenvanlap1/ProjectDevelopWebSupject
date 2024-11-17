const MongoDB = require('../utils/mongodb.util');
const NhaXuatBanService = require('../services/nhaxuatban.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client); 
        const result = await nhaxuatbanService.create(req.body); 
        res.status(201).send(result); 
    } 
    catch (error) { 
        return next(
            new ApiError(500, error.message)
        );
    }
}

exports.findAll = async (req, res, next) => {
    let results = [];
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const tennxb = req.body.tennxb;
        if(tennxb) {
            results = await nhaxuatbanService.findByName(tennxb);
        } else {
            results = await nhaxuatbanService.find({});
        }
        res.send(results);
    } catch(error){
        return next(
            new ApiError(500, `An error occurred while retrieving NXB: ${error}`)
        )
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const id = req.params.id
        const result = await nhaxuatbanService.findById(id);
        if( result.length === 0) {
            return next(new ApiError(404, "NXB not found"))
        }
        res.send(result);
    } catch(error) {
        return next( new ApiError(500, `error retrieving NXB with id=${req.params.id}: ${error}`))
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body) === 0) {
        return next(new ApiError(400, 'Data to update canot be empty'));
    }
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        console.log("here");
        const result = await nhaxuatbanService.update(req.params.id, req.body);
        if(!result) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({message: 'NXB was updated suscessfully'});
    } catch(error) {
        return next (new ApiError(500, `Error updating with id=${req.params.id}: ${error}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const nhaxuatbanService = new NhaXuatBanService(MongoDB.client);
        const result = await nhaxuatbanService.delete(req.params.id);
        if(!result) {
            return next(new ApiError(404, 'nxb not found'));
        }
        return res.send({message: 'Contact was deleted suscessfully'});
    } catch(error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all nhaxuatban"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite nhaxuatban"})
};
// file controller