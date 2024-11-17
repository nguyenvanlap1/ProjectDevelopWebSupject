const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create theodoimuonsach"});
};

exports.findAll = async (req, res, next) => {
    res.send({message: "find all theodoimuonsach"})
};

exports.findOne = async (req, res, next) => {
    res.send({message: "find one theodoimuonsach"})
};

exports.update = async (req, res, next) => {
    res.send({message: "update theodoimuonsach"})
};

exports.delete = async (req, res, next) => {
    res.send({message: "delete theodoimuonsach"})
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all theodoimuonsach"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite theodoimuonsach"})
};
// file controller