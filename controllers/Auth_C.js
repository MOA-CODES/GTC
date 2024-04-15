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

const update = async (req, res)=>{

    const {email} = req.user

    const {nok_phone, nok_name, dob} = req.body

    const updateObject = {};

    if(nok_phone){
        updateObject.nok_phone = nok_phone
    }

    if(nok_name){
        updateObject.nok_name = nok_name
    }

    if(dob){
        updateObject.dob = dob
    }

    if(Object.keys(updateObject).length === 0){
        throw new customError("Provide your date of birth, or next of kin details to update your profile", StatusCodes.NOT_FOUND, "Incomplete Data")
    }

    const user = await User.update(updateObject, {where:{email},returning:true})
    //sequelize returns its updates in an array format, first value is the number of rows updated, then the next fields are the rows that were updated

    if(!user){
        throw new customError("User does not exist", StatusCodes.NOT_FOUND)
    }

    const result = {...user[1][0].dataValues}

    res.status(StatusCodes.OK).json({msg:`${result.fullname} was updated` })
}

const getUser = async(req, res)=>{//if you put a phone number get that user, if you dont get all users

    const {phone} = req.body 

    let user;

    if(phone){
         user = await User.findOne({where:{phone},attributes:{exclude:['password']}})
    }else{
        user = await User.findAll({attributes:["fullname","email","phone",],})
    }

    res.status(StatusCodes.OK).json({user})
}

const deleteUser = async(req, res)=>{ //review later, by making an admin
    const {phone} = req.params

    if(!phone){
        throw new customError("Provide a phone number to delete user", StatusCodes.BAD_REQUEST)
    }

    const findUser = await User.findOne({where:{phone}})

    if(!findUser){
        throw new customError("User doesn't exist", StatusCodes.BAD_GATEWAY)
    }else{
        await User.destroy({where:{phone}}) //returns 1 if something was found, 0 otherwise
    }

    res.status(StatusCodes.OK).json({msg:`Deleted User with phone number: ${phone}`})
}

module.exports = {register, logout, login, update, getUser, deleteUser}