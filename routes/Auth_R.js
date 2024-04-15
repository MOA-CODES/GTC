const express = require('express');
const router = express.Router()

const auth = require('../middleware/Authentication')
const {register, logout, login, update} = require('../controllers/Auth_C')

router.post('/login', login)
router.post('/register', register)
router.post('/logout', auth, logout)
router.put('/update', auth, update)


module.exports = router