const express = require("express");
const { readFile } = require("../fs/fs");
const router = express.Router();
const {register, login} = require('../register/register')


router.get('/users', (req, res) => {
    const users = readFile('users.json')
    res.send(JSON.stringify(users))
})
router.post("/register", register)
router.post("/login", login)



module.exports = router