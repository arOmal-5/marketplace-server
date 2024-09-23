const express = require('express');
const { usertest } = require('../controllers/userController');

const router = express.Router()

router.get('/' , usertest)

module.exports = router;