const express = require('express');
const router = express.Router();

const {auth, Rolecheck, validate} = require('../middleware')

const {acceptPayments, verifyPayments, getTransactions, getTransaction, chargeAuthorization, transactionTotals} = require('../controllers/Paystack_C')

router.post('/acceptPayments', acceptPayments)

router.post('/chargeAuthorization', auth, Rolecheck(['Owner','Admin']),chargeAuthorization)

router.get('/verifyPayments/:reference', auth, Rolecheck(['Owner','Admin']),verifyPayments)

router.get('/getTransactions', auth, Rolecheck(['Owner','Admin']),getTransactions)

router.get('/getTransaction/:id', auth, Rolecheck(['Owner','Admin']),getTransaction)

router.get('/transactionTotals', auth, Rolecheck(['Owner','Admin']),transactionTotals)

module.exports = router