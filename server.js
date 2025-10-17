const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./models');

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/authRoutes');
app.use('/api/auth', authRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.send('API funcionando correctamente');
});

// Conectar a la base de datos y levantar el servidor
db.sequelize.authenticate()
  .then(() => {
    console.log('✅ Conexión a la base de datos exitosa');

    db.sequelize.sync({ alter: true }).then(() => {
      app.listen(3000, () => {
        console.log('🚀 Servidor backend corriendo en http://localhost:3000');
      });
    });

  })
  .catch(err => {
    console.error('❌ Error de conexión:', err);
  });
