'use strict';
const productsData = require('../masterdata/product.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataProductsToBeSeeded = productsData.map((eachProductData) => {
      return {
        name: eachProductData.name,
        description: eachProductData.description,
        price: eachProductData.price,
        status: eachProductData.status,
        category_id: eachProductData.category_id,
        isPublished: eachProductData.isPublished,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Products', dataProductsToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Products', null, { truncate: true, restartIdentity: true });
  }
};