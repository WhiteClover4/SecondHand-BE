const { sequelize } = require("../models");

afterAll(async () => {
    await sequelize.close();
});

const userTest = require('./user.controller.test');
const authTest  = require('./auth.controller.test');
const productTest  = require('./product.controller.test');

describe('run test sequentially', () => {
    userTest();
    authTest();
    productTest();
})

