const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create docgia"});
};

exports.findAll = async (req, res, next) => {
    res.send({message: "find all docgia"})
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

// file controller