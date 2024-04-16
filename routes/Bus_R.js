const express = require('express')
const router = express.Router()

const {createBus, getBus, updateBus, deleteBus} = require ('../controllers/Bus_C')

router.post('/create', createBus)

router.get('/getbus', getBus)

router.put('/update', updateBus)

router.delete('/delete', deleteBus)

module.exports = router