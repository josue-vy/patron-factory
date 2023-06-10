const express = require('express');
const NotificationController = require('../controllers/NotificationController');

const router = express.Router();

router.post('/', NotificationController.createNotification);
router.get('/:id', NotificationController.getNotificationById);
router.get('/', NotificationController.getAllNotifications);

module.exports = router;