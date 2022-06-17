'use strict';
const rolesData = require('../masterdata/role.json');

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataRolesToBeSeeded = rolesData.map((eachRoleData) => {
      return {
        name: eachRoleData.name,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Roles', dataRolesToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Roles', null, { truncate: true, restartIdentity: true });
  }
};