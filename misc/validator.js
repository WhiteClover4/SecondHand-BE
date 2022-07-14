const {check, validationResult} = require("express-validator");

const createValidationFor = (route) => {
    switch (route) {
        case 'register':
            return [
                check('name').not().isEmpty().withMessage('name cant be null').isLength({ min: 3 }).withMessage('name must be minimum 3 length'),
                check('email').not().isEmpty().withMessage('email cant be null').isEmail().withMessage('must be an email'),
                check('password').not().isEmpty().withMessage('password cant be null').isLength({ min: 8 }).withMessage('password must be minimum 8 length'),
            ];
        case 'login':
            return [
                check('email').not().isEmpty().withMessage('email cant be null'),
                check('password').not().isEmpty().withMessage('password cant be null')
        ];
        case 'forget-password':
            return [
                check('email').not().isEmpty().withMessage('email cant be null'),
        ];
        case 'update-user':
            return [
                check('name').not().isEmpty().withMessage('name cant be null'),
        ];
        case 'create-buyer/transaction':
            return [
                check('offer_price').not().isEmpty().withMessage('offer_price cant be null')
        ];
        case 'update-seller/product/preview':
            return [
                check('name').not().isEmpty().withMessage('name cant be null'),
                check('description').not().isEmpty().withMessage('description cant be null'),
                check('price').not().isEmpty().withMessage('price cant be null'),
                check('category').not().isEmpty().withMessage('category cant be null')
        ];
        case 'update-seller/product/publish':
            return [
                check('name').not().isEmpty().withMessage('name cant be null'),
                check('description').not().isEmpty().withMessage('description cant be null'),
                check('price').not().isEmpty().withMessage('price cant be null'),
                check('category').not().isEmpty().withMessage('category cant be null')
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