'use strict';
const productImagesData = require('../masterdata/productImage.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataProductImagesToBeSeeded = productImagesData.map((eachProductImageData) => {
      return {
        product_id: eachProductImageData.product_id,
        product_pictures: eachProductImageData.product_pictures,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('ProductImages', dataProductImagesToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ProductImages', null, { truncate: true, restartIdentity: true });
  }
};