'use strict';
const usersData = require('../masterdata/user.json');
const bcrypt               = require('bcrypt');
const { SALT_ROUNDS }      = process.env;

module.exports = {
  async up (queryInterface, Sequelize) {
    const dataUsersToBeSeeded = usersData.map((eachUserData) => {
      return {
        name: eachUserData.name,
        email: eachUserData.email,
        password: bcrypt.hashSync(eachUserData.password, +process.env.SALT_ROUNDS),
        city: eachUserData.city,
        address: eachUserData.address,
        phone_number: eachUserData.phone_number,
        role_id: eachUserData.role,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    })
    await queryInterface.bulkInsert('Users', dataUsersToBeSeeded, {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, { truncate: true, restartIdentity: true });
  }
};
