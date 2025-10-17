const { DataTypes } = require('sequelize');
const { sequelize } = require('./index');

const Client = sequelize.define('Client', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
  },
  phone: {
    type: DataTypes.STRING,
  },
  email: {
    type: DataTypes.STRING,
    validate: { isEmail: true },
  }
}, {
  tableName: 'clients',
  timestamps: true,
});

module.exports = Client;
