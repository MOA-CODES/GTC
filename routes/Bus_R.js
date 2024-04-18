const express = require('express')
const router = express.Router()

const {auth,Rolecheck} = require('../middleware')
const {createBus, getBus, updateBus, deleteBus, deleteBus2} = require ('../controllers/Bus_C')

router.post('/create', auth, Rolecheck(['Admin','Owner']), createBus)

router.get('/getbus', auth, getBus)

router.put('/update/:id', auth, Rolecheck(['Admin','Owner']), updateBus)

router.delete('/delete/:id', auth, Rolecheck(['Admin','Owner']), deleteBus)

router.delete('/delete', auth, Rolecheck(['Admin','Owner']), deleteBus2)


module.exports = router