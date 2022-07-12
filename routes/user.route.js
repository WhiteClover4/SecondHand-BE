const express              = require('express');
const router               = express.Router();
const userController       = require('../controllers/user.controller');
const imageUpload          = require('../misc/multer');
const {authenticate}         = require('../misc/passport');
const {uploadWithCloudinary} = require('../misc/cloudinary');

router.get('/', authenticate, userController.getAllUsers);
router.get('/data', authenticate, userController.getUserData);
router.put('/', authenticate, imageUpload.single('profile_picture'), uploadWithCloudinary, userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;