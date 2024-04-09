const express = require('express');
const router = express.Router()

const auth = require('../middleware/Authentication')
const {register, logout, login} = require('../controllers/Auth_C')

router.post('/register', register)
router.post('/logout', auth, logout)
router.post('/login', login)

module.exports = router