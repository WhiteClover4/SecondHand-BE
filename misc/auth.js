const bcrypt = require('bcrypt');

const checkPassword = (password, hashedPassword) => bcrypt.compareSync(password, hashedPassword);

module.exports = {
    checkPassword
};