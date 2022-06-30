const express              = require('express');
const router               = express.Router();
const userController       = require('../controllers/user.controller');
const imageUpload          = require('../misc/multer');
const userChecking         = require('../misc/passport');
const uploadWithCloudinary = require('../misc/cloudinary');

router.get('/', userChecking, userController.getAllUsers);
router.get('/data', userChecking, userController.getUserData);
router.put('/', userChecking, imageUpload.single('profile_picture'), uploadWithCloudinary, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;