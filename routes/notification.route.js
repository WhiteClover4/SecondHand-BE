const express        = require('express');
const router         = express.Router();
const notificationRoutes     = require('../controllers/notification.controller');
const { authenticate }   = require('../misc/passport');

router.get('/', authenticate, notificationRoutes.getAllNotifications);
router.get('/:id', notificationRoutes.getNotificationById);
router.post('/', notificationRoutes.createNotification);
router.put('/:id', notificationRoutes.updateNotification);
router.delete('/:id', notificationRoutes.deleteNotification);
router.put('/read/:id', authenticate, notificationRoutes.updateReadNotification);

module.exports = router;