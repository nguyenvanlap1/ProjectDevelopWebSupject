const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create nhaxuatban"});
};

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