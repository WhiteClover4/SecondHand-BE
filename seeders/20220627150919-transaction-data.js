'use strict';
const transactionsData = require('../masterdata/transaction.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataTransactionsToBeSeeded = transactionsData.map((eachTransactionData) => {
      return {
        seller_id: eachTransactionData.seller_id,
        buyer_id: eachTransactionData.buyer_id,
        product_id: eachTransactionData.product_id,
        offer_price: eachTransactionData.offer_price,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Transactions', dataTransactionsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Transactions', null, { truncate: true, restartIdentity: true });
  }
};
