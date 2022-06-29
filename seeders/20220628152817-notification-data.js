'use strict';
const notificationData = require('../masterdata/notification.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataNotificationsToBeSeeded = notificationData.map((eachNotificationData) => {
      return {
        product_id: eachNotificationData.product_id,
        user_id: eachNotificationData.user_id,
        message: eachNotificationData.message,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Notifications', dataNotificationsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Notifications', null, { truncate: true, restartIdentity: true });
  }
};
