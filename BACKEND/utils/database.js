const Sequelize = require("sequelize");

const sequelize = new Sequelize("candyshop", "root", "Shubham@@387", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
