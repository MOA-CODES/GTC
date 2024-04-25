const express = require('express');
const router = express.Router()

const {auth,Rolecheck,validate} = require('../middleware')

const {registerV, loginV, updateV,updateRoleV,getUserV,deleteUserV, forgotPasswordV} = require('../validators/Auth_V')

const {register, logout, login, update, getUser, deleteUser, updateRole,forgotPassword, test} = require('../controllers/Auth_C');

router.post('/login', validate(loginV,['body']), login)
router.post('/register', validate(registerV,['body']), register)
router.put('/forgotPassword', validate(forgotPasswordV,['body']), forgotPassword)

router.post('/logout',  auth, logout)
router.put('/update', auth, validate(updateV,['body']), update)
router.get('/getUser', auth, validate(getUserV, ['body']), getUser)

router.post('/test', auth, Rolecheck(['Owner']), test)
router.delete('/deleteUser', auth,  Rolecheck(['Owner','Admin']),validate(deleteUserV,['body']), deleteUser)
router.put('/updateRole', auth, Rolecheck(['Owner']), validate(updateRoleV,['body']), updateRole)

module.exports = router