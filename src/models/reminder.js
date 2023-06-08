const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Reminder extends Model {
    static associate(models) {
      Reminder.belongsTo(models.Food, {
        foreignKey: 'foodId',
      });
    }
  }

  Reminder.init(
    {
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      foodId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Reminder",
    }
  );

  return Reminder;
};
