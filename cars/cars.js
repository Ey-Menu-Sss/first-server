
const { readFile, writeFile } = require("../fs/fs");
const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const cars = readFile("cars.json");

// for home page get cars!
const getCars = (req, res) => {
  const { id } = jwt.verify(req.headers.token, process.env.KEYWORD),
    arr = [];
  process.env.UserId = id;
  cars.forEach((c) => c.user_id === id && arr.push(c));
  res.send(JSON.stringify(arr)); 
};

// add new car
const newCar = (req, res) => {
  cars.push({
    id: uuid.v1(),
    ...req.body,
    user_id: process.env.UserId,
  });
  writeFile("cars.json", cars);
  res.status(200).send(JSON.stringify(cars));
   
};

// delete car
const deleteCar = (req, res) => {
  const { id } = req.params;
  cars.find((c, i) => {
    if (c?.id === id) {
      console.log(c);
      cars.splice(i, 1);
      writeFile("cars.json", cars);
    }
  });

  res.send("deleted!");
};

// update car

const updateCar = (req, res) => {
    const {id} = req.params
    cars.find((c, i) => {
        if(c?.id === id){
            c = {
                id: id,
                ...req.body,
                user_id: process.env.UserId
            }
            cars[i] = c
            writeFile('cars.json', cars)
        }
    })

    res.send("updated")
}
module.exports = {
  getCars,
  newCar,
  deleteCar,
  updateCar
};
