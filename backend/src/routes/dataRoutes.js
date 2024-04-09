const express = require('express');
const router = express.Router();
const multer = require('multer');
const storage = multer.memoryStorage();
const upload = multer({ storage });
const userController = require('../controllers/dataController');

router.post('/api/login', userController.login);
router.post('/api/checkUser', userController.checkUser);
router.post('/api/register', userController.register);
router.post('/api/fileupload', upload.single('file'), userController.uploadFile);
router.get('/api/:fileId', userController.getFile);
router.get('/api/confirmemail/:username', userController.confirmEmail);
router.post('/api/email', userController.sendMail);

module.exports = router;