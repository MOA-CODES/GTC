const Book = require ('../models/Booking_M')
const {customError} = require('../services')

const {StatusCodes} = require('http-status-codes')

const createBooking = async(req, res)=>{
    const {userid, busid} = req.body

    if(!userid || !busid){
        throw new customError('userid and busid is required', StatusCodes.BAD_REQUEST)
    }

    const createdBooking = await Book.create(req.body)

    res.status(StatusCodes.CREATED).json({createdBooking})
}

const getBookings = async (req, res)=>{
    const bookings = await Book.findAll({})

    res.status(StatusCodes.OK).json({no: bookings.length, bookings})
}

const getMyBookings = async (req, res)=>{
    const {bookid, userid} = req.body

    let bookings;

    if(bookid){ //finds only one if bookid is specified,
        bookings = await Book.findOne({where:{id:bookid}})
    }else if(userid){// finds all your booking
        bookings = await Book.findAll({where:{userid}})
    }else{
        throw new customError("Provide Booking id or userid", StatusCodes.BAD_REQUEST)
    }

    res.status(StatusCodes.OK).json({bookings})
}

const updateBooking = async (req, res)=>{
    const {bookid, userid, busid} = req.body

    updateObject = {}

    if(userid){
        updateObject.userid = userid
    }
    if(busid){
        updateObject.busid = busid
    }

    if(Object.keys(updateObject).length === 0){
        throw new customError("provide userid or busid to update the booking with", StatusCodes.BAD_REQUEST, "Incomplete Data")
    }

    await Book.update(updateObject, {where:{id:bookid}, returning:true})

    res.status(StatusCodes.OK).json({msg: `updated booking with id ${bookid}`})
}

const deleteBooking = async (req, res)=>{
    const {bookid, userid, busid} = req.body

    updateObject = {}

    if(userid){
        updateObject.userid = userid
    }
    if(busid){
        updateObject.busid = busid
    }

    let msg;
    let book;

    if(bookid){
        book = await Book.destroy({where: {id:bookid}})
        msg = `deleted booking with id ${bookid}`
    }else if(!(Object.keys(updateObject).length === 0)){
        book = await Book.destroy({where: updateObject})

        const updateString = `updateObject = { ${Object.entries(updateObject).map(([key, value]) => `${key}: '${value}'`).join(', ')} }`;

        msg = `deleted booking with ${updateString}`

    }else{
        throw new customError("provide a busid, userid or bookid to delete buses", StatusCodes.BAD_REQUEST)
    }

    if(!book){
        throw new customError("book does not exist", StatusCodes.NOT_FOUND)
    }

    res.status(StatusCodes.OK).json(msg)
}

module.exports = {createBooking, getBookings, getMyBookings, updateBooking, deleteBooking}