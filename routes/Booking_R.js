const express = require('express');
const router = express.Router();

const {auth, Rolecheck, validate} = require('../middleware')

const {createBookingV,  getMyBookingsV, updateBookingV, deleteBookingV} = require('../validators/Booking_V')

const {createBooking, getBookings, getMyBookings, updateBooking, deleteBooking} = require('../controllers/Booking_C')

router.post('/', auth, Rolecheck(['Owner','Admin']),validate(createBookingV,['body']), createBooking)

router.get('/Bookings', auth, Rolecheck(['Owner','Admin']), getBookings)

router.get('/MyBookings', validate(getMyBookingsV,['body']), getMyBookings)

router.put('/updateBookings', auth, Rolecheck(['Owner','Admin']), validate(updateBookingV,['body']), updateBooking)

router.delete('/deleteBooking', auth, Rolecheck(['Owner','Admin']), validate(deleteBookingV,['body']), deleteBooking)


module.exports = router

