const joi = require('joi')

const createBusV = joi.object({
    brand: joi.string().required(),
    destination: joi.string().required(),
    departureDate: joi.date().required(),
    terminal: joi.string().required(),
    priceChild: joi.number().required(),
    priceAdult: joi.number().required()
})

const getBusV = joi.object({
    destination: joi.string().optional(),
    departureDate: joi.date().optional(),
    terminal: joi.string().optional(),
    destinationTerminal: joi.string().optional(),
})

const updateBusVp = joi.object({
    id: joi.string().required(),
})

const updateBusVb = joi.object({
    brand: joi.string().optional(),
    destination: joi.string().optional(),
    departureDate: joi.date().optional(),
    terminal: joi.string().optional(),
    priceChild: joi.number().optional(),
    priceAdult: joi.number().optional(),
    roundTrip: joi.string().optional(),
    destinationTerminal: joi.string().optional(),
})

const deleteBusV = joi.object({
    id: joi.string().optional(),
    brand: joi.string().optional(),
    destination: joi.string().optional(),
    departureDate: joi.date().optional(),
    terminal: joi.string().optional(),
    priceChild: joi.number().optional(),
    priceAdult: joi.number().optional(),
    roundTrip: joi.string().optional(),
    destinationTerminal: joi.string().optional(),
})

module.exports = {createBusV, getBusV, updateBusVp, updateBusVb, deleteBusV}