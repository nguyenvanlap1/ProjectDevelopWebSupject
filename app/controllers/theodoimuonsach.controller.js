const MongoDB = require('../utils/mongodb.util');
const MuonSachService = require('../services/theodoimuonsach.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const result = await muonSachService.create(req.body);
        res.status(201).send(result);
    } catch (error) {
        return next(new ApiError(500, `Failed to create record: ${error.message}`));
    }
};

exports.findAll = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const results = await muonSachService.find({});
        res.send(results);
    } catch (error) {
        return next(new ApiError(500, `An error occurred while retrieving records: ${error.message}`));
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const result = await muonSachService.findById(req.params.id);
        if (!result) {
            return next(new ApiError(404, 'Record not found'));
        }
        res.send(result);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving record with id=${req.params.id}: ${error.message}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const result = await muonSachService.update(req.params.id, req.body);
        if (!result) {
            return next(new ApiError(404, 'Record not found'));
        }
        res.send({ message: 'Record was updated successfully' });
    } catch (error) {
        return next(new ApiError(500, `Error updating record with id=${req.params.id}: ${error.message}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const result = await muonSachService.delete(req.params.id);
        if (!result) {
            return next(new ApiError(404, 'Record not found'));
        }
        res.send({ message: 'Record was deleted successfully' });
    } catch (error) {
        return next(new ApiError(500, `Could not delete record with id=${req.params.id}: ${error.message}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const muonSachService = new MuonSachService(MongoDB.client);
        const deleteCount = await muonSachService.deleteAll();
        res.send({ message: `${deleteCount} records were deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, `An error occurred while removing all records: ${error.message}`));
    }
};
