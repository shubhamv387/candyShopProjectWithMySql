const DataType = require("sequelize");

const sequelize = require("../utils/database");

const Candy = sequelize.define("candy", {
  id: {
    type: DataType.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  candyName: DataType.STRING,
  candyDescription: DataType.STRING,
  candyPrice: DataType.DOUBLE,
  candyQty: DataType.INTEGER,
});

module.exports = Candy;
