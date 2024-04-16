const express = require('express')
const router = express.Router()

const {createBus, getBus, updateBus, deleteBus, deleteBus2} = require ('../controllers/Bus_C')

router.post('/create', createBus)

router.get('/getbus', getBus)

router.put('/update/:id', updateBus)

router.delete('/delete/:id', deleteBus)

router.delete('/delete', deleteBus2)


module.exports = router