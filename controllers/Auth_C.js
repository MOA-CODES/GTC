const User = require('../models/User_M')
const {TBlacklist} = require('../models/TBlacklist_M')
const {StatusCodes} = require('http-status-codes')
const {customError} = require('../services')

const register = async (req, res)=> {
    const user = await User.create(req.body)

    const token = await user.createJWT()

    return res.status(StatusCodes.CREATED).json({msg:`User- ${user.fullname}, created successfully`,token})
}

const login = async (req, res) => {
    const {email, password} = req.body

    if(!email){
        throw new customError('Provide email', StatusCodes.BAD_REQUEST)
    }

    if(!password){
        throw new customError('Provide password', StatusCodes.BAD_REQUEST)
    }

    const user = await User.findOne({where:{email}})//they are so stupid or extra for needing "where"

    if(!user){
        throw new customError("User does not exist", StatusCodes.NOT_FOUND)
    }

    const compare = await user.comparePassword(password)

    if(!compare){
        throw new customError('Wrong password', StatusCodes.UNAUTHORIZED)
    }

    const token = await user.createJWT()
    res.status(StatusCodes.OK).json({msg:"login successfull", token})
}

const logout = async (req, res) => { //front end dev puts the token in auth header after login or registration
    const {token} = req.user  

    await TBlacklist.create({token})

    res.status(StatusCodes.OK).json({msg:`logout successfull`})
}

module.exports = {register, logout, login}