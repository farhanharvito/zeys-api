'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Food extends Model {
    static associate(models) {
    }
  }
  Food.init(
    {
        // food_id:{
        //     type: DataTypes.INTEGER,
        //     allowNull: false,
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
      },
        expdate: {
            type: DataTypes.DATE,
            allowNull: false,
      },
    },
    {
    sequelize,
    modelName: 'Food',
    });
  return Food;
};