const express              = require('express');
const router               = express.Router();
const userRoutes           = require('../controllers/user.controller');
const imageUpload          = require('../misc/multer');
const userChecking         = require('../misc/passport');
const uploadWithCloudinary = require('../misc/cloudinary');
const { createValidationFor, checkValidationResult } = require('../misc/validator');

router.get('/', userChecking,userRoutes.getAllUsers);
router.post('/register', createValidationFor("register"), checkValidationResult, imageUpload.single('profile_picture'), uploadWithCloudinary, userRoutes.register);
router.post('/login', userRoutes.login);
router.post('/send-email', userRoutes.sendToEmail);
router.post('/get-otp', userRoutes.getOtp);
router.post('/new-password', userRoutes.PasswordOTP);
router.put('/:id', userRoutes.updateUser);
router.delete('/:id', userRoutes.deleteUser);

module.exports = router;