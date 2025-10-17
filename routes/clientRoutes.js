const express = require('express');
const router = express.Router();

const { verifyToken, requireRole } = require('../middleware/authMiddleware');

router.get('/', verifyToken, requireRole('admin'), (req, res) => {
  res.json({ message: 'Clientes listados correctamente' });
});

module.exports = router;