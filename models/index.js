const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user')(sequelize, DataTypes);
db.Client = require('./Client')(sequelize, DataTypes);
// Aquí los otros modelos que tengas...

db.Consumption = require('./Consumption')(sequelize, DataTypes);

db.Client.hasMany(db.Consumption, { foreignKey: 'clientId' });
db.Consumption.belongsTo(db.Client, { foreignKey: 'clientId' });

module.exports = db;
