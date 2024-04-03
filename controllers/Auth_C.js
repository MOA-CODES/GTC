const {StatusCodes} = require('http-status-codes')

const User = require('../models/User_M')

const register = async (req, res) => {

    const user = await User.create(req.body)

    res.status(StatusCodes.OK).send
}

const login = async (req, res) => {
    
}

const logout = async (req, res) => {
    
}

module.exports = {register, logout, login}