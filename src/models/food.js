const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.User, { foreignKey: 'user_id' });
      Food.hasMany(models.Reminder, { foreignKey: 'foodId' });
    }
  }

  Food.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      expDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      }
    },
    {
      sequelize,
      modelName: 'Food',
    }
  );

  return Food;
};
