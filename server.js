const express = require('express')
const dotenv = require("dotenv")
const cors = require("cors")
const {readFile} = require('./fs/fs');
const registerRouter = require("./routes/registerRouter");
const carsRouter = require("./routes/carsRouter");
const app = express()
dotenv.config()
const port = process.env.PORT || 7772
app.use(cors())

app.use(express.json());
app.use(registerRouter)
app.use(carsRouter)

app.listen(port, () => {
    console.log("Server running on port", port)
})
