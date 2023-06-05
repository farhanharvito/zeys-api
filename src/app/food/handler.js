const { Food } = require("../../models");

async function getAllFoodHandler(req, res, next) {
  try {
    const food = await Food.findAll();
    res.json(food);
  } catch (err) {
    next(err);
  }
}

async function createFood(req, res, next) {
  const { name, date } = req.body;
  try {
    const food = await Food.create({ name, expdate: date });
    res.status(201).json(food);
  } catch (error) {
    next(error);
  }
}

async function deleteFood(req, res, next) {
  const { id } = req.params;
  try {
    const food = await Food.destroy({
      where: {
        id,
      },
    });
    if (!food) {
      return res
        .status(404)
        .json({ msg: `Food with id : ${id} not found` });
    }
    res.status(200).json({ msg: `Food with id : ${id} has beed deleted` });
  } catch (error) {
    next(error);
  }
}

async function updateFood(req, res, next) {
  const { id } = req.params;
  const { name, date } = req.body;

  try {
    await Food.update(
      {
        name: name,
        expdate: date
      },
      {
        where: {
          id,
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
  createFood,
  deleteFood,
  updateFood,
};
