const { User } = require("../../models");
const bcrypt = require("bcrypt");

// Get all users
async function getAllUsers(req, res) {
    try {
      const users = await User.findAll({
        attributes: ["user_id", "email"],
      });
      if (!users) return res.status(404).json({ msg: "Users is empty" });
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // Get specific user by id
  async function getSingleUser(req, res) {
    const { id } = req.params;
    try {
      const users = await User.findOne({
        attributes: ["user_id", "email"],
        where: {
          user_id: id,
        },
      });
      if (!users)
        return res.status(404).json({ msg: `User with id : ${id} not found` });
      res.status(200).json(users);
    } catch (error) {
      console.log(error.message);
    }
  }
  
  // delete user by id
  async function deleteUser(req, res) {
    const { id } = req.params;
    const singleUser = await User.findOne({
      where: {
        user_id: id,
      },
    });
    if (!singleUser)
      return res.status(404).json({ msg: `User with id : ${id} not found` });
  
    try {
      await User.destroy({
        where: {
          user_id: singleUser.user_id,
        },
      });
      res.status(200).json({ msg: `User with id : ${id} has been deleted` });
    } catch (error) {
      console.log(error.message);
    }
  }

  
  // user signup
  async function Register(req, res) {
    const {email, password} =
      req.body;
  
    const response = await User.findOne({
      where: {
        email: email,
      },
    });
  
    if (response) return res.status(400).json({ msg: "Email already exist" });
  
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
  
    try {
      const newUser = await User.create({

        email: email,
        password: hashedPassword,
      });
      return res.json;

    } catch (error) {
      console.log(error.message);
    }
  }

  module.exports = {
    getAllUsers,
    getSingleUser,
    Register,
    deleteUser,
  };