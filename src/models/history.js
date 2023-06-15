const { Model } = require('sequelize');
const dataTypes = require('sequelize/lib/data-types');

module.exports = (sequelize, DataTypes) => {
  class History extends Model {
    static associate(models) {
      History.belongsTo(models.User, { foreignKey: 'idUser', targetKey: 'user_id' });
      History.belongsTo(models.Food, { foreignKey: 'idFood', targetKey: 'food_id' });
    }
  }

  History.init(
    {
      history_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      idFood: {
        type: DataTypes.INTEGER,
      },
      foodName:{
        type: DataTypes.STRING,
        allowNull: false,
      },
      consumedDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      idUser: {
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize,
      tableName: 'history',
    }
  );

  return History;
};
