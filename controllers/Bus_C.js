const Bus = require('../models/Bus_M')
const {StatusCodes} = require('http-status-codes')
const {customError} = require('../services')

const createBus = async (req, res) =>{
    const {brand, destination,departureDate,terminal,priceChild,priceAdult} = req.body

    const bus = await Bus.create(req.body)

    return res.status(StatusCodes.OK).json({msg:`Bus routing from ${bus.terminal} to ${bus.destination} created `})
}

const getBus = async (req, res) =>{
    const {destination, departureDate, terminal, destinationTerminal} = req.body

    const queryObject = {};

    let bus ;

    if(destination){
        queryObject.destination = destination;
    }
    if(terminal){
        queryObject.terminal = terminal;
    }
    if(departureDate){
        queryObject.departureDate = departureDate;
    }

    if(destinationTerminal){
        queryObject.destinationTerminal = destinationTerminal;
        bus = await Bus.findAll({where:{queryObject},attributes:{exclude: ['roundTrip']}})
    }else if(Object.keys(queryObject).length === 0){
        bus = await Bus.findAll({})
    }else{
        bus = await Bus.findAll({where:{queryObject},attributes:{exclude: ['roundTrip', 'destinationTerminal']}})
    }

    res.status(StatusCodes.OK).json({no:bus.length,bus})
}

const updateBus = async (req, res) =>{
    const {id} = req.params

    const findBus = await Bus.findOne({where:{id}})

    if(!findBus){
        throw new customError("Bus not found", StatusCodes.NOT_FOUND)
    }

    const {brand, destination, departureDate, terminal, priceChild, priceAdult,roundTrip, destinationTerminal} = req.body

    const updateObject = {}

    if(brand){
        updateObject.brand = brand
    }
    if(destination){
        updateObject.destination = destination
    }
    if(departureDate){
        updateObject.departureDate = departureDate
    }
    if(terminal){
        updateObject.terminal = terminal
    }
    if(priceChild){
        updateObject.priceChild = priceChild
    }
    if(priceAdult){
        updateObject.priceAdult = priceAdult
    }
    if(roundTrip){
        updateObject.roundTrip = roundTrip
    }
    if(destinationTerminal){
        updateObject.destinationTerminal = destinationTerminal
    }

    if(Object.keys(updateObject).length === 0){
        throw new customError("provide data to update the bus with", StatusCodes.BAD_REQUEST, "Incomplete Data")
    }

    const bus = await Bus.update(updateObject,{where:{id},returning:true})

    res.status(StatusCodes.OK).json({msg:`Bus with ${id} was updated`})
}

const deleteBus = async (req, res) =>{
    //implement later delete by id or all that have x values

    const {id} = req.params 

    if(!id){
        throw new customError("Provide an id to delete a bus", StatusCodes.BAD_REQUEST)
    }

    const bus = await Bus.destroy({where: {id}})

    if(!bus){
        throw new customError("bus does not exist", StatusCodes.BAD_REQUEST)
    }
    
    res.json(StatusCodes.OK).json({msg:`Deleted Bus with id ${id}`})
}

module.exports = {createBus, getBus, updateBus, deleteBus}