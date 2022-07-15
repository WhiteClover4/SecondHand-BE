const express        = require('express');
const router         = express.Router();
const notificationRoutes     = require('../controllers/notification.controller');
const { authenticate }   = require('../misc/passport');

router.get('/', authenticate, notificationRoutes.getAllNotifications);
router.put('/read/:id', authenticate, notificationRoutes.updateReadNotification);

module.exports = router;