const fs = require("fs")

const readFile = (fileName) => {
    return JSON.parse(fs.readFileSync(`./db/${fileName}`))
}
const writeFile = (fileName, data) => {
    return fs.writeFileSync(`./db/${fileName}`, JSON.stringify(data))
}


module.exports = {
    readFile,
    writeFile
}