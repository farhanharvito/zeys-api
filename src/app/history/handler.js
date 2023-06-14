const { History } = require('../../models');

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
    const history = await History.findAll();
    res.json({ history });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to retrieve history entries' });
  }
};

const getAllHistoryByUser = async (req, res) => {
    try {
      const user_id = req.params.user_id; // Assuming the user ID is passed as a route parameter
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
  getAllHistoryByUser,
};
