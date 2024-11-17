const express = require('express');
const theodoimuonsach  = require('../controllers/theodoimuonsach.controller');

const router = express.Router();

router.route("/")
    .get(theodoimuonsach.findAll)
    .post(theodoimuonsach.create)
    .delete(theodoimuonsach.deleteAll);

router.route("/:id")
    .get(theodoimuonsach.findOne)
    .put(theodoimuonsach.update)
    .delete(theodoimuonsach.delete);

module.exports=router;
