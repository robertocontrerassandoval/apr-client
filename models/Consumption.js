// models/Consumption.js
module.exports = (sequelize, DataTypes) => {
  const Consumption = sequelize.define('Consumption', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    clientId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'clients',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    previousReading: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    currentReading: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    consumption: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
  }, {
    tableName: 'consumptions',
    timestamps: true,
  });

  return Consumption;
};
