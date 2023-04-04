const express = require("express");
const { readFile } = require("../fs/fs");
const router = express.Router();
const {getCars, newCar, deleteCar, updateCar} = require("../cars/cars")

router.route("/cars")
.get(getCars)
.post(newCar)

router.route("/cars/:id")
.delete(deleteCar)
.put(updateCar)




module.exports = router