'use strict';

const citiesData = require("../masterdata/city.json").map((eachCityData) => {
    eachCityData.createdAt = new Date();
    eachCityData.updatedAt = new Date();
    return eachCityData;
});

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert("Cities", citiesData);
    },

    async down(queryInterface, Sequelize) {
        await queryInterface.bulkDelete("Cities", null, { truncate: true, restartIdentity: true });
    }
};
