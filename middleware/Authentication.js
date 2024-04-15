const jwt = require('jsonwebtoken')
const {StatusCodes} = require('http-status-codes')

const {customError} = require('../services')
const {TBlacklist} = require('../models/TBlacklist_M')

const auth = async(req, res, next) =>{

    const authHeader = req.headers.authorization

    if(!authHeader || !authHeader.startsWith('Bearer')){
        throw new customError('Authentication Invalid', StatusCodes.UNAUTHORIZED)
    }

    const token = authHeader.split(' ')[1]

    const checkTB = await TBlacklist.findOne({where:{token}})

    if(checkTB && !(checkTB === null)){
        throw new customError('You are already logged out', StatusCodes.UNAUTHORIZED)
    }

    try{
        const payload = jwt.verify(token, process.env.KEY)
        req.user = {phone: payload.phone, email: payload.email,token}
        next()
    }catch(e){
        throw new customError('Authentication Invalid', StatusCodes.UNAUTHORIZED)
    }
}

module.exports = auth