const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  timestamp: {
    type: Date,
    default: Date.now,
  },
});

const Notification = mongoose.model('Notification', notificationSchema);

class NotificationRepository {
  static async createNotification(userId, message) {
    const notification = new Notification({ user: userId, message });
    return notification.save();
  }

  static async getNotificationById(id) {
    return Notification.findById(id).populate('user');
  }

  static async getAllNotifications() {
    return Notification.find().populate('user');
  }
}

module.exports = { Notification, NotificationRepository };
