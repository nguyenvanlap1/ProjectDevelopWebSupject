const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create sach"});
};

exports.findAll = async (req, res, next) => {
    res.send({message: "find all sach"});
};

exports.findOne = async (req, res, next) => {
    res.send({message: "find one sach"})
};

exports.update = async (req, res, next) => {
    res.send({message: "update sach"})
};

exports.delete = async (req, res, next) => {
    res.send({message: "delete sach"})
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all sach"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite sach"})
};
// file controller