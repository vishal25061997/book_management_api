const Sequelize = require("sequelize");

const sequelize = new Sequelize("book_management_api", "root", "Yadav@123", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
