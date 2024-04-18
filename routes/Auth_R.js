const express = require('express');
const router = express.Router()

const {auth,Rolecheck} = require('../middleware')
const {register, logout, login, update, getUser, deleteUser, updateRole, test} = require('../controllers/Auth_C')

router.post('/login', login)
router.post('/register', register)

router.post('/logout', auth, logout)
router.put('/update', auth, update)
router.get('/getUser', auth, getUser)

router.post('/test', auth, Rolecheck(['Owner']), test)
router.delete('/deleteUser/:phone', auth, Rolecheck(['Owner','Admin']), deleteUser)
router.put('/updateRole', auth, Rolecheck(['Owner']), updateRole)



module.exports = router