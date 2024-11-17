const MongoDB = require('../utils/mongodb.util');
const ContactService = require('../services/contact.service');
const ApiError = require('../api-error');

exports.create = async (req, res, next) => {
    res.send({message:"create nhanvien"});
};

exports.findAll = async (req, res, next) => {
    res.send({message:"find all nhanvien"});
};

exports.findOne = async (req, res, next) => {
    res.send({message: "find one nhanvien"})
};

exports.update = async (req, res, next) => {
    res.send({message: "update nhanvien"})
};

exports.delete = async (req, res, next) => {
    res.send({message: "delete nhanvien"})
};

exports.deleteAll = async (req, res, next) =>  {
    res.send({message: "delete all nhanvien"})
};

exports.findAllFavorite = async (req, res, next) => {
    res.send({message: "find all favorite nhanvien"})
};
// file controller