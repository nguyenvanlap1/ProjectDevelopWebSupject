const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create docgia"});
};

exports.findAll = async (req, res, next) => {
<<<<<<< HEAD
    let documents = [];
    
    res.send(documents);
=======
    res.send({message: "find all docgia"})
>>>>>>> efc28df7b7977feb8bface049e6f33872251d0bd
};

exports.findOne = async (req, res, next) => {
    res.send({message: "find one docgia"})
};

exports.update = async (req, res, next) => {
    res.send({message: "update docgia"})
};

exports.delete = async (req, res, next) => {
    res.send({message: "delete docgia"})
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all docgia"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite"})
};
// file controller