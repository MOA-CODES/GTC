const joi = require('joi');

const createBookingV = joi.object({
    userid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).required(),

    busid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).required(),
})


const getMyBookingsV = joi.object({
    bookid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),

      userid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),
})

const updateBookingV = joi.object({
    bookid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).required(),

    userid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),

    busid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),
})

const deleteBookingV = joi.object({
    bookid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),

    userid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),

    busid: joi.alternatives().try(
        joi.string().guid({ version: 'uuidv4' }),
        joi.string().valid('general')
      ).optional(),
})




module.exports = {createBookingV,  getMyBookingsV, updateBookingV, deleteBookingV}