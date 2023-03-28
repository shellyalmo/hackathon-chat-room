const Users = require("../models/User.js");

//@desc Get users
//@route GET /api/users

const getUsers = async (req, res) => {
  const users = await Users.find();
  res.status(200).json(users);
};

//@desc Get user by id
//@route GET /api/users/:id
const getUsersById = async (req, res) => {
  const users = await Users.findById(req.params.id);
  res.status(200).json(users);
};

//@desc Set User
//@route POST /api/user
//@access Private
const setUser = async (req, res) => {
  if (!req.body) {
    res.status(400);
    throw new Error("Please add ID");
  }
  const user = await Users.create({
    name: req.body.name,
  });

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  getUsersById,
  setUser,
};
