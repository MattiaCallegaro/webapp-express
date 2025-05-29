//importo express
const express = require("express");
const router = express.Router();

//importo il controller
const filmController = require("../controller/filmController")

//rotte CRUD

router.get('/', filmController.index)

router.get('/:id', filmController.show)

module.exports = router

