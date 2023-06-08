const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
      Food.belongsTo(models.User, { foreignKey: 'idUser', targetKey: 'user_id' });
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
      idUser: {
        type: DataTypes.INTEGER,
      }
    },
    {
      sequelize,
      tableName: 'foods',
    }
  );

  return Food;
};
