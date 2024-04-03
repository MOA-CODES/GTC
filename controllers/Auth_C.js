const {sq} = require('../db/conn')
const {Sequelize} = require('sequelize')
const {StatusCodes} = require('http-status-codes')

const User = require('../models/User_M')

const register = async (req, res)=> {

    const user = await User.create(req.body)

    res.status(StatusCodes.CREATED).json({msg:"user created successfully",user})
}

const login = async (req, res) => {
    
}

const logout = async (req, res) => {
    
}

module.exports = {register, logout, login}