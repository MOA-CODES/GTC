class customError extends Error{
    constructor (message, statusCode, errname = null){
        super(message)
        this.statusCode = statusCode
        this.errname = errname
    }
}

module.exports = customError