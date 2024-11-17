const MongoDB = require('../utils/mongodb.util');
const SachService = require('../services/sach.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try {
        const sachService = new SachService(MongoDB.client); 
        const result = await sachService.create(req.body); 
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
        const sachService = new SachService(MongoDB.client);
        const tensach = req.body.tensach;
        if (tensach) {
            results = await sachService.findByName(tensach);
        } else {
            results = await sachService.find({});
        }
        res.send(results);
    } catch (error) {
        return next(
            new ApiError(500, `An error occurred while retrieving books: ${error}`)
        );
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const id = req.params.id;
        const result = await sachService.findById(id);
        if (result.length === 0) {
            return next(new ApiError(404, "Book not found"));
        }
        res.send(result);
    } catch (error) {
        return next(new ApiError(500, `Error retrieving book with id=${req.params.id}: ${error}`));
    }
};

exports.update = async (req, res, next) => {
    if (Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    try {
        const sachService = new SachService(MongoDB.client);
        const result = await sachService.update(req.params.id, req.body);
        if (!result) {
            return next(new ApiError(404, 'Book not found'));
        }
        return res.send(result);
    } catch (error) {
        return next(new ApiError(500, `Error updating book with id=${req.params.id}: ${error}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const result = await sachService.delete(req.params.id);
        if (!result) {
            return next(new ApiError(404, 'Book not found'));
        }
        return res.send({ message: `Book was deleted successfully` });
    } catch (error) {
        return next(new ApiError(500, `Could not delete book with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) => {
    try {
        const sachService = new SachService(MongoDB.client);
        const deleteCount = await sachService.deleteAll();
        return res.send({
            message: `${deleteCount} books were deleted successfully`
        });
    } catch (error) {
        return next(
            new ApiError(500, `An error occurred while removing all books: ${error}`)
        );
    }
};
