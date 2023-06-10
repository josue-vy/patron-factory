const express = require('express');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const notificationRouter = require('./routes/notificationRoutes');
const rabbitMQManager = require('./rabbitmq');
const { swaggerDocs } = require('./swagger');

const app = express();
const port = 3000;
// Configuración de la conexión a MongoDB
mongoose.connect('mongodb+srv://josue:123.456.789@notifications.dgzjhtw.mongodb.net/', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
  console.log('Conexión a MongoDB Atlas establecida');
})
.catch(error => {
  console.error('Error al conectar a MongoDB Atlas:', error);
});

// Middleware para analizar el cuerpo de las solicitudes como JSON
app.use(express.json());

// Rutas
app.use('/api/users', userRouter);
app.use('/api/notifications', notificationRouter);

app.listen(port, async () => {
  try {
    // Establecer la conexión con RabbitMQ
    await rabbitMQManager.connect();

    // Consumir mensajes del canal
    await rabbitMQManager.consumeMessages('notifications_queue');

  
  } catch (error) {
    console.error('Error al establecer conexión con RabbitMQ:', error);
  }

  console.log(`Servidor escuchando en el puerto ${port}`);
  swaggerDocs(app, port);
});
module.exports = app;
