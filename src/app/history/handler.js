const { History, Food, User } = require('../../models');

// Create a new history entry
const createHistory = async (req, res) => {
  try {
    const { idFood, foodName, consumedDate, idUser } = req.body;
    const history = await History.create({ idFood, foodName, consumedDate, idUser });
    res.status(201).json({ history });
    await Food.destroy({ where: { food_id: idFood, idUser } });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to create history entry' });
  }
};


// Get all history entries for a specified user
const getAllHistory = async (req, res) => {
  try {
    const user_id = req.user.user_id;
    const history = await History.findAll({
      where: {
        idUser: user_id,
      },
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
};
