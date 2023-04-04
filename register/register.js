const uuid = require("uuid");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { readFile, writeFile } = require("../fs/fs");
const users = readFile("users.json");
const jsonName = "users.json";

// register
const register = async (req, res) => {
  const { username, email, password } = req.body;
  const hashedPsw = await bcrypt.hash(password, 10);
  let checkUsername = users.find((user) => user.username === username);
  let checkEmail = users.find((user) => user.email === email);
  if (checkUsername) {
    return res.status(400).send("username already exists");
  } else if (checkEmail) {
    return res.send("this email is being used by another user");
  }
  users.push({
    id: uuid.v1(),
    ...req.body,
    password: hashedPsw,
  });
  writeFile(jsonName, users);
  let token = jwt.sign({ id: users[users.length - 1].id}, process.env.KEYWORD);
  res.send(JSON.stringify({ token }));
};
// login
const login = async (req, res) => {
  const { username, password } = req.body;
  let checkUsers = users.find((user) => user.username === username);
  if (!checkUsers) {
    return res.status(400).send("User not found");
  }
  const checkPsw = await bcrypt.compare(password, checkUsers.password);
  console.log(checkPsw);
  if (checkPsw) {
    let token = jwt.sign({ id: checkUsers.id }, process.env.KEYWORD);
    return res.send(JSON.stringify({ token }));
  } else {
    return res.send("invalid password");
  }
};

module.exports = {
  register,
  login,
};
