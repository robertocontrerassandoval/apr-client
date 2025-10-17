const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../models');

const User = db.User;

exports.register = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) return res.status(400).json({ message: 'El correo ya está registrado' });

    const password_hash = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password_hash, role });

    res.status(201).json({ message: 'Usuario creado', user: newUser });
  } catch (err) {
    console.error('Error en register:', err); // <--- Aquí mostramos error real
    res.status(500).json({ message: 'Error en registro', error: err.message });
  }
};


exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(401).json({ message: 'Credenciales inválidas' });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '4h' }
    );

    res.json({ token, user: { id: user.id, name: user.name, role: user.role } });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error en login' });
  }
};
