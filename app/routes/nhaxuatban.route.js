const express = require('express');
const nhaxuatban  = require('../controllers/nhaxuatban.controller');

const router = express.Router();

router.route("/")
    .get(nhaxuatban.findAll)
    .post(nhaxuatban.create)
    .delete(nhaxuatban.deleteAll);

router.route("/favorite")
    .get(nhaxuatban.findAllFavorite);

router.route("/:id")
    .get(nhaxuatban.findOne)
    .put(nhaxuatban.update)
    .delete(nhaxuatban.delete);

module.exports=router;
