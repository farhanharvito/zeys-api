const { Reminder, Food } = require("../../models");
const { Op } = require("sequelize");

async function getAllRemindersHandler(req, res, next) {
  try {
    const reminders = await Reminder.findAll({
      include: Food,
    });
    res.json(reminders);
  } catch (err) {
    next(err);
  }
}

async function createReminder(req, res, next) {
  const { description, expDate } = req.body;
  try {
    const reminder = await Reminder.create({ description, expdate: expDate });
    res.status(201).json(reminder);
  } catch (error) {
    next(error);
  }
}

async function getReminderById(req, res, next) {
  const { id } = req.params;
  try {
    const reminder = await Reminder.findByPk(id, {
      include: Food,
    });
    if (!reminder) {
      return res.status(404).json({ msg: `Reminder with id: ${id} not found` });
    }
    res.json(reminder);
  } catch (error) {
    next(error);
  }
}

async function detectExpiredFood(req, res, next) {
  try {
    const currentDate = new Date();
    const expiredFoods = await Food.findAll({
      where: {
        expDate: {
          [Op.lt]: currentDate,
        },
      },
    });
    res.json(expiredFoods);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllRemindersHandler,
  createReminder,
  getReminderById,
  detectExpiredFood,
};
