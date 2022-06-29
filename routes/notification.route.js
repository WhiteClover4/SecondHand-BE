const express        = require('express');
const router         = express.Router();
const notificationRoutes     = require('../controllers/notification.controller');

router.get('/', notificationRoutes.getAllNotifications);
router.get('/:id', notificationRoutes.getNotificationById);
router.post('/', notificationRoutes.createNotification);
router.put('/:id', notificationRoutes.updateNotification);
router.delete('/:id', notificationRoutes.deleteNotification);

module.exports = router;