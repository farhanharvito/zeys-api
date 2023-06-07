"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Food", {
      foodId: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        unique: true,
      },
      expDate: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      user_id: { // Add the foreign key column
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "Users", // Name of the referenced table (Users table)
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
    await queryInterface.dropTable("Food");
  },
};
