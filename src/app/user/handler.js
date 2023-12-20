const { User } = require("../../models");
const bcrypt = require("bcrypt");

const handleServerError = (res, error) => {
  console.error(error);
  res.status(500).json({ error: "Internal Server Error" });
};

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    handleServerError(res, error);
  }
};

const createUser = async (req, res) => {
  const { name, email, password, phone, username } = req.body;

  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const newUser = await User.create({
      name,
      email,
      password: await bcrypt.hash(password, 10),
      phone,
      username,
    });
    res.status(201).json(newUser);
  } catch (error) {
    handleServerError(res, error);
  }
};
const findUserById = async (userId) => {
  const user = await User.findByPk(userId);
  return user;
};

const deleteUser = async (req, res) => {
  try {
    const user = await findUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    await user.destroy();
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    handleServerError(res, error);
  }
};

const loginHandler = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid password" });
    }

    res.json({ message: "Login successful", user });
  } catch (error) {
    handleServerError(res, error);
  }
};

module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  loginHandler,
};
