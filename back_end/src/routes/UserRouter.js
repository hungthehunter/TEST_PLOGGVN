const express = require('express');
const router = express.Router();
const userController = require('../controllers/UserController');
// const {authMiddleware,authUserMiddleware} = require('../middleware/AuthMiddleware')

router.post('/sign-up',userController.createUser)
router.post('/sign-in',userController.loginUser)
router.post('/refresh-token/',userController.refreshToken);

module.exports = router;