const sequelize = require('../config/db');
const DataTypes = require('sequelize');

const User = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

const synchronizeTable = async () => {
  await User.sync();
  console.log('The table for the User model was synchronized!');
};

synchronizeTable();

module.exports = User;
