const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/authMiddleware');
const { Client } = require('../models'); // asumiendo que importas el modelo Sequelize Client

// Ruta para obtener todos los clientes, solo usuarios con rol 'admin' o 'secretaria'
router.get('/', verifyToken, requireRole('admin', 'secretaria'), async (req, res) => {
  try {
    const clients = await Client.findAll();
    res.json(clients);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener clientes' });
  }
});

module.exports = router;
