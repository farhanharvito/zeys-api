const { Food, Reminder } = require("../../models");

async function getAllFoodHandler(req, res, next) {
  try {
    const user_id = req.user.user_id; 
    const food = await Food.findAll({
      where: {
      idUser: user_id, 
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
    const user_id = req.user.user_id; 
    const food = await Food.findByPk(id, {
      include: Reminder,
      where: {
        idUser: user_id, 
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
  const user_id = req.user.user_id;
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
  const user_id = req.user.user_id; 
  try {
    const food = await Food.destroy({
      where: {
        id,
        idUser: user_id, 
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
  const user_id = req.user.user_id; 

  try {
    await Food.update(
      {
        name: name,
        expDate: date,
      },
      {
        where: {
          id,
          idUser: user_id, 
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
