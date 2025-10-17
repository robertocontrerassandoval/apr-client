const express = require('express');
const router = express.Router();
const { verifyToken, requireRole } = require('../middleware/authMiddleware');
const db = require('../models');

router.post('/', verifyToken, requireRole('admin', 'operador'), async (req, res) => {
  try {
    const { clientId, date, previousReading, currentReading } = req.body;
    const consumption = currentReading - previousReading;

    const record = await db.Consumption.create({
      clientId,
      date,
      previousReading,
      currentReading,
      consumption,
    });

    res.json({ message: 'Lectura registrada', record });
  } catch (error) {
    res.status(500).json({ message: 'Error al registrar lectura', error });
  }
});

router.get('/:clientId', verifyToken, async (req, res) => {
  try {
    const consumos = await db.Consumption.findAll({
      where: { clientId: req.params.clientId },
      order: [['date', 'DESC']],
    });
    res.json(consumos);
  } catch (err) {
    res.status(500).json({ message: 'Error al obtener datos', error: err });
  }
});

module.exports = router;
