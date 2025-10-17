// /models/user.js
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: { type: DataTypes.STRING, allowNull: false },
    email: { type: DataTypes.STRING, unique: true, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false }, // ✅ correcto
    role: { type: DataTypes.ENUM('admin', 'operador', 'secretaria'), allowNull: false }
  });

  return User;
};
