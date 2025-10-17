const express = require('express');
const router = express.Router();
const clientController = require('../controllers/clientController');
const { verifyToken, requireRole } = require('../middleware/authMiddleware');

// Solo usuarios autenticados pueden ver clientes
router.get('/', verifyToken, clientController.getAll);

// Solo admin puede crear clientes
router.post('/', verifyToken, requireRole('admin'), clientController.create);

module.exports = router;
