const { UserRepository } = require('../models/User');
const { NotificationRepository } = require('../models/Notification');
const rabbitMQManager = require('../rabbitmq');

const exchangeName = 'notifications_exchange';
const routingKey = 'notifications';

class NotificationController {
  static async createNotification(req, res) {
    try {
      const { username, message } = req.body;

      const user = await UserRepository.getUserByUsername(username);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }

      const notification = await NotificationRepository.createNotification(user._id, message);

      // Enviar mensaje a RabbitMQ
      const channel = rabbitMQManager.getChannel();
      const notificationData = { username: user.username, message };
      const messageBuffer = Buffer.from(JSON.stringify(notificationData));
      channel.publish(exchangeName, routingKey, messageBuffer);

      return res.status(200).json({ notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async getNotificationById(req, res) {
    try {
      const { id } = req.params;
      const notification = await NotificationRepository.getNotificationById(id);
      if (!notification) {
        return res.status(404).json({ error: 'Notificación no encontrada' });
      }
      return res.status(200).json({ notification });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }

  static async getAllNotifications(req, res) {
    try {
      const notifications = await NotificationRepository.getAllNotifications();
      return res.status(200).json({ notifications });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: 'Error en el servidor' });
    }
  }
}

module.exports = NotificationController;
