'use strict';

const categoriesData = require("../masterdata/categories.json").map((eachCategoryData) => {
    eachCategoryData.createdAt = new Date();
    eachCategoryData.updatedAt = new Date();
    return eachCategoryData;
});

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Categories", categoriesData);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Categories", null, { truncate: true, restartIdentity: true });
    }
};
