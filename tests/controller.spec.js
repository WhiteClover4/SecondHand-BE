const { sequelize } = require("../models");

afterAll(async () => {
    await sequelize.close();
});

const authTest  = require('./auth.controller.test');

describe('run test sequentially', () => {
    authTest();
})

