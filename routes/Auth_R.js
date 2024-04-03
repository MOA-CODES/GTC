const express = require('express');
const router = express.Router()

const {register, logout, login} = require('../controllers/Auth_C')

router.post('/register', register)

module.exports = router