const {StatusCodes} = require('http-status-codes')
const errorHandler = (err, req, res, next) => {

    let customError = {
        msg: err.message || 'Something went wrong try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        name: err.errname || err.name
    }

    if(err.code === 11000){
        let key, value;
        for(key in err.KeyValue){
            value = err.keyValue[key]
        }
        customError.msg = `${key} : ${value} already exists`
        customError.name = 'Duplicate key error'
    }

    return res.status(customError.statusCode).send({error:{name: customError.name,msg:customError.msg}})
}

module.exports = errorHandler