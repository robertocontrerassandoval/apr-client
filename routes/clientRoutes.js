const express = require('express');
const router = express.Router();

const db = require('../models');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Obtener todos los clientes (solo para admin y secretaria)
router.get('/', verifyToken, requireRole('admin', 'secretaria'), async (req, res) => {
  try {
    const clients = await db.Client.findAll();
    res.json(clients);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener clientes', error: err.message });
  }
});

// Crear nuevo cliente (solo admin y operador)
router.post('/', verifyToken, requireRole('admin', 'operador'), async (req, res) => {
  try {
    const client = await db.Client.create(req.body);
    res.status(201).json(client);
  } catch (err) {
    res.status(400).json({ message: 'Error al crear cliente', error: err.message });
  }
});

// Obtener cliente por ID
router.get('/:id', verifyToken, requireRole('admin', 'secretaria'), async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });
    res.json(client);
  } catch (err) {
    res.status(500).json({ message: 'Error al buscar cliente', error: err.message });
  }
});

// Editar cliente
router.put('/:id', verifyToken, requireRole('admin', 'operador'), async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await client.update(req.body);
    res.json(client);
  } catch (err) {
    res.status(400).json({ message: 'Error al actualizar cliente', error: err.message });
  }
});

// Eliminar cliente
router.delete('/:id', verifyToken, requireRole('admin'), async (req, res) => {
  try {
    const client = await db.Client.findByPk(req.params.id);
    if (!client) return res.status(404).json({ message: 'Cliente no encontrado' });

    await client.destroy();
    res.json({ message: 'Cliente eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ message: 'Error al eliminar cliente', error: err.message });
  }
});

module.exports = router;
