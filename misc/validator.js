const {check, validationResult} = require("express-validator");

const createValidationFor = (route) => {
    switch (route) {
        case 'register':
            return [
                check('email').isEmail().withMessage('must be an email'),
                check('password').not().isEmpty().withMessage('password cant be null').isLength({ min: 8 }).withMessage('password must be minimum 8 length'),
            ];

        default:
            return [];
    }
}

const checkValidationResult = (req, res, next) => {
    const result = validationResult(req);
    if (result.isEmpty()) {
        return next();
    }

    res.status(422).json({ errors: result.array() });
}

module.exports = {
    createValidationFor,
    checkValidationResult
};