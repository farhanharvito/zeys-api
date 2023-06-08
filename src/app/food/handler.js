const { Food, Reminder } = require("../../models");

async function getAllFoodHandler(req, res, next) {
  try {
    const userId = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
    const food = await Food.findAll({
      include: Reminder,
      where: {
        user_id: userId, // Add the condition to filter food items by user ID
      },
    });
    res.json(food);
  } catch (err) {
    next(err);
  }
}

async function getFoodById(req, res, next) {
  const { id } = req.params;
  try {
    const userId = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
    const food = await Food.findByPk(id, {
      include: Reminder,
      where: {
        user_id: userId, // Add the condition to filter food items by user ID
      },
    });
    if (!food) {
      return res.status(404).json({ msg: `Food with id: ${id} not found` });
    }
    res.json(food);
  } catch (error) {
    next(error);
  }
}

async function createFoodManual(req, res, next) {
  const { name, date } = req.body;
  const userId = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
  try {
    const food = await Food.create({ name, expDate: date, user_id: userId });
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
}

async function createFoodML(req, res, next) {
    const { name, date } = req.body;
    try {
      const food = await Food.create({ name, expDate: date });
      res.status(201).json(food);
    } catch (error) {
      next(error);
    }
  }

async function deleteFood(req, res, next) {
  const { id } = req.params;
  const userId = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
  try {
    const food = await Food.destroy({
      where: {
        id,
        user_id: userId, // Add the condition to filter food items by user ID
      },
    });
    if (!food) {
      return res.status(404).json({ msg: `Food with id : ${id} not found` });
    }
    res.status(200).json({ msg: `Food with id : ${id} has been deleted` });
  } catch (error) {
    next(error);
  }
}

async function updateFood(req, res, next) {
  const { id } = req.params;
  const { name, date } = req.body;
  const userId = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification

  try {
    await Food.update(
      {
        name: name,
        expDate: date,
      },
      {
        where: {
          id,
          user_id: userId, // Add the condition to filter food items by user ID
        },
      }
    );

    return res.status(200).json({ msg: `Food with id : ${id} updated` });
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllFoodHandler,
  getFoodById,
  createFoodManual,
  createFoodML,
  deleteFood,
  updateFood,
};
