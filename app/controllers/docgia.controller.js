const MongoDB = require('../utils/mongodb.util');
const DocGiaService = require('../services/docgia.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => { 
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const result = await docGiaService.create(req.body); 
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
        const docGiaService = new DocGiaService(MongoDB.client);
        const ten = req.body.ten;
        if(ten) {
            results = await docGiaService.findByName(ten);
        } else {
            results = await docGiaService.find({});
        }
        res.send(results);
    } catch(error){
        return next(
            new ApiError(500, `An error occurred while retrieving readers: ${error}`)
        )
    }
};

exports.findOne = async (req, res, next) => {
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const id = req.params.id;
        const result = await docGiaService.findById(id);
        if( result.length === 0) {
            return next(new ApiError(404, "Reader not found"))
        }
        res.send(result);
    } catch(error) {
        return next( new ApiError(500, `Error retrieving reader with id=${req.params.id}: ${error}`))
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body).length === 0) {
        return next(new ApiError(400, 'Data to update cannot be empty'));
    }
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const result = await docGiaService.update(req.params.id, req.body);
        if(!result) {
            return next(new ApiError(404, 'Reader not found'));
        }
        return res.send(result);
    } catch(error) {
        return next (new ApiError(500, `Error updating reader with id=${req.params.id}: ${error}`));
    }
};

exports.delete = async (req, res, next) => {
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const result = await docGiaService.delete(req.params.id);
        if(!result) {
            return next(new ApiError(404, 'Reader not found'));
        }
        return res.send({message: `Reader was deleted successfully`});
    } catch(error) {
        return next(new ApiError(500, `Could not delete reader with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) =>  {
    try {
        const docGiaService = new DocGiaService(MongoDB.client);
        const deleteCount = await docGiaService.deleteAll();
        return res.send({
            message: `${deleteCount} readers were deleted successfully`
        })
    } catch(error) {
         return next(
            new ApiError(500, `An error occurred while removing all readers: ${error}`)
        )
    }
};
