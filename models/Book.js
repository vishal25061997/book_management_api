const { Sequelize } = require("sequelize");
const sequelize = require("../db/db");

const Book = sequelize.define("Book", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  author: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  publicationYear: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
});

module.exports = Book;
