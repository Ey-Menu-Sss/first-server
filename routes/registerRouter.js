const express = require("express");
const { readFile } = require("../fs/fs");
const router = express.Router();
const {register, login} = require('../register/register')

router.post("/register", register)
router.post("/login", login)



module.exports = router 
