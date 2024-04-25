const express = require('express')
const router = express.Router()

const {auth,Rolecheck,validate} = require('../middleware')

const {createBusV, getBusV, updateBusVp, updateBusVb, deleteBusV} = require('../validators/Bus_V')

const {createBus, getBus, updateBus, deleteBus, deleteBus2} = require ('../controllers/Bus_C')

router.post('/create', auth, Rolecheck(['Admin','Owner']), validate(createBusV, ['body']), createBus)

router.get('/getbus', validate(getBusV,['body']), getBus)

router.put('/update/:id', auth, Rolecheck(['Admin','Owner']),  validate(updateBusVp,['params']), validate(updateBusVb,['body']), updateBus)

// router.delete('/delete/:id', auth, Rolecheck(['Admin','Owner']), deleteBus)

router.delete('/delete', auth, Rolecheck(['Admin','Owner']), validate(deleteBusV,['body']), deleteBus2)

module.exports = router