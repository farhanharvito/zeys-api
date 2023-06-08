const { Food, Reminder } = require("../../models");

async function getAllFoodHandler(req, res, next) {
  try {
    const user_id = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
    const food = await Food.findAll({
      where: {
      idUser: user_id, // Add the condition to filter food items by user ID
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
    const user_id = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
    const food = await Food.findByPk(id, {
      include: Reminder,
      where: {
        idUser: user_id, // Add the condition to filter food items by user ID
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
  const { name, expDate } = req.body;
  const user_id = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
  try {
    const food = await Food.create({ name, expDate: expDate, idUser: user_id });
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
}

async function createFoodML(req, res, next) {
    const { name, expDate } = req.body;
    try {
      const food = await Food.create({ name, expDate: expDate });
      res.status(201).json(food);
    } catch (error) {
      next(error);
    }
  }

async function deleteFood(req, res, next) {
  const { id } = req.params;
  const user_id = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification
  try {
    const food = await Food.destroy({
      where: {
        id,
        idUser: user_id, // Add the condition to filter food items by user ID
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
  const user_id = req.user.user_id; // Assuming the user ID is stored in the req.user object after token verification

  try {
    await Food.update(
      {
        name: name,
        expDate: date,
      },
      {
        where: {
          id,
          idUser: user_id, // Add the condition to filter food items by user ID
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
