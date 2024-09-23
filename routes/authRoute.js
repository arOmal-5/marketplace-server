const express = require('express');
const { signUpController, signinController } = require('../controllers/authController');

const router = express.Router()

// Change this to POST request
router.post('/signup', signUpController)
router.post('/signin',signinController)

module.exports = router;