const { History, Food, User } = require('../../models');

// Create a new history entry
const createHistory = async (req, res) => {
  try {
    const { idFood, consumedDate, idUser } = req.body;
    const history = await History.create({ idFood, consumedDate, idUser });
    res.status(201).json({ history });
    await Food.destroy({ where: { id: idFood, idUser } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create history entry' });
  }
};

// Get all history entries
const getAllHistory = async (req, res) => {
  try {
    const history = await History.findAll({
      include: [
        { model: Food, as: 'food', attributes: ['name'] },
        { model: User, as: 'user', attributes: ['username'] }
      ],
    });
    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve history entries' });
  }
};

// Get all history entries for a specified user
const getAllHistoryByUser = async (req, res) => {
  try {
    const user_id = req.params.user_id;
    const history = await History.findAll({
      where: {
        idUser: user_id,
      },
      include: [
        { model: User, as: 'User', attributes: ['username'] },
        { model: Food, as: 'Food', attributes: ['name'] }
      ],
    });
    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve history entries' });
  }
};

module.exports = {
  createHistory,
  getAllHistory,
  getAllHistoryByUser,
};
