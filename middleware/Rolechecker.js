const {customError} = require('../services')
const {StatusCodes} = require('http-status-codes')

const Rolecheck = (validRoles) =>{
    const Validroles = validRoles
    return (req, res, next)=>{
        if(!Validroles.includes(req.user.role)){
            throw new customError("Unauthorized for this action", StatusCodes.UNAUTHORIZED, "Permission Error")
        }
        next()
    }
}

module.exports = Rolecheck