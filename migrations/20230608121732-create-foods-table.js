"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("foods", {
      food_id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      expDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      idUser: { // Add the foreign key column
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users", // Name of the referenced table (Users table)
          key: "user_id", // Primary key of the referenced table (user_id column)
        },
        onUpdate: "CASCADE",
        onDelete: "CASCADE",
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("foods");
  },
};
