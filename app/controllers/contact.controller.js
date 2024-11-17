const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create NXB"});
    if(!req.body?.name) {
        return next(new ApiError(400, 'Name cannot be empty'));
    }

    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.create(req.body)
        
        return res.send(document);
    } catch(error) {
        return next(
            new ApiError(500, 'An error occurred while creating the contact')
        );
    }
};

exports.findAll = async (req, res, next) => {
    let documents = [];

    try {
        const contactService = new ContactService(MongoDB.client);
        const {name} = req.query; 
        if(name) {
            documents = await contactService.findByName(name);
        } else {
            documents = await contactService.find({});
        }
    } catch(error) {
        return next(
            new ApiError(500, 'An error occurred while retrieving contacts')
        )
    }
    
    res.send(documents);
};

exports.findOne = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findById(req.params.id);
        if(!document) {
            return next(new ApiError(404, "Contact not found"))
        }
        return res.send(document);
    } catch(error) {
        return next( new ApiError(500, `error retrieving contact with id=${req.params.id}`))
    }
};

exports.update = async (req, res, next) => {
    if(Object.keys(req.body) === 0) {
        return next(new ApiError(400, 'Data to update canot be empty'));
    }
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.update(req.params.id, req.body);
        if(!document) {
            console.log(document);
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({message: 'Contact was updated suscessfully'});
    } catch(error) {
        return new ApiError(500, `Error updating with id=${req.params.id}`);
    }
};

exports.delete = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.delete(req.params.id);
        if(!document) {
            return next(new ApiError(404, 'Contact not found'));
        }
        return res.send({message: 'Contact was deleted suscessfully'});
    } catch(error) {
        return next(new ApiError(500, `Could not delete contact with id=${req.params.id}`));
    }
};

exports.deleteAll = async (req, res, next) =>  {
    try{
        const contactService = new ContactService(MongoDB.client);
        const deleteCount = await contactService.deleteAll();
        return res.send({
            message: `${deleteCount} contacts were deleted sucessfully`
        })
    } catch(error) {
        return next(
            new ApiError(500, 'An error occurred while removing all contacts')
        )
    }
};

exports.findAllFavorite = async (req, res, next) => {
    try {
        const contactService = new ContactService(MongoDB.client);
        const document = await contactService.findFavorite();
        res.send(document);
    } catch(error) {
        return next(new ApiError(500, 'An error occurred while retrieving favorite contacts'));
    }
};
// file controller