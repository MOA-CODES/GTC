const User = require('../models/User_M')
const {StatusCodes} = require('http-status-codes')

const register = async (req, res)=> {
    console.log(req.body)

    const user = await User.create(req.body)

    return res.status(StatusCodes.CREATED).json({msg:"user created successfully",user})
}

const login = async (req, res) => {

}

const logout = async (req, res) => {
    
}

module.exports = {register, logout, login}